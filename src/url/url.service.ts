import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { IsNull, Repository } from 'typeorm'
import { UrlEntity } from './entities/url.entity'
import { UserResponseDto } from 'src/user/dtos/user-response.dto'

@Injectable()
export class UrlService {
  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(UrlEntity)
    private readonly urlRepository: Repository<UrlEntity>,
  ) {}

  private generateShortCode(length = 6): string {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'
    let code = ''
    for (let i = 0; i < length; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    return code
  }

  private isDatabaseError(error: any): error is { code: string } {
    return typeof error === 'object' && error !== null && 'code' in error
  }

  async createShortUrl(originalUrl: URL, authUser: UserResponseDto): Promise<URL> {
    let urlShortCode: string = ''
    let attempts = 0
    const maxAttempts = 5
    const stringUrl = originalUrl.toString()
    const PG_UNIQUE_CONSTRAINT_VIOLATION = '23505'

    while (attempts < maxAttempts) {
      try {
        urlShortCode = this.generateShortCode()
        await this.urlRepository.save({ originalUrl: stringUrl, urlShortCode, user: authUser })

        const apiHost = this.configService.get<string>('API_HOST', 'http://localhost:3001')
        const shortenerUrl: URL = new URL(`${apiHost}/${urlShortCode}`)
        return shortenerUrl
      } catch (error) {
        if (this.isDatabaseError(error) && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
          attempts += 1
          continue
        }

        console.error('[UrlService] Error on createShortUrl:', JSON.stringify(error))
        throw new InternalServerErrorException('An unexpected error occurred.')
      }
    }

    throw new ConflictException(
      `Failed to create ShortUrl after ${maxAttempts} attempts. Try again later.`,
    )
  }

  async findUrlByShortCode(urlShortCode: string): Promise<UrlEntity> {
    const url = await this.urlRepository.findOne({
      where: { urlShortCode, deletedAt: IsNull() },
      relations: ['user'],
    })
    if (!url) throw new NotFoundException('Shorten code not found')
    return url
  }

  async incrementUrlAccessCounter(url: UrlEntity): Promise<void> {
    url.accessCounter += 1
    url.lastAccessAt = new Date()
    await this.urlRepository.save(url)
  }

  async updateUrlByShortCode(url: UrlEntity, updateUrl: URL, user: UserResponseDto): Promise<void> {
    if ((url.user && url.user.id !== user.id) || url.user === null) {
      throw new UnauthorizedException('You do not have permission to update this URL.')
    }

    url.originalUrl = updateUrl.toString()
    await this.urlRepository.save(url)
  }
}

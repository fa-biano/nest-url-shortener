import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { CreateUrlDto } from './dto/create-url.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UrlEntity } from './url.entity'

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

  async createShortUrl(createUrlDto: CreateUrlDto): Promise<URL> {
    let shortCode: string = ''
    let exists = true

    while (exists) {
      shortCode = this.generateShortCode()
      const saveShortCode = await this.urlRepository.findOne({ where: { shortCode } })
      exists = saveShortCode ? true : false
    }

    await this.urlRepository.save({ originalUrl: new URL(createUrlDto.originalUrl), shortCode })

    const dns = this.configService.get<string>('API_DNS', 'http://localhost:3001')
    const shortenerUrl: URL = new URL(`${dns}/${shortCode}`)
    return shortenerUrl
  }
}

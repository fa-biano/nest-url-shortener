import { Injectable, NotFoundException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UrlEntity } from './entities/url.entity'

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

  async createShortUrl(originalUrl: URL): Promise<URL> {
    let urlShortCode: string = ''
    let exists = true

    while (exists) {
      urlShortCode = this.generateShortCode()
      const saveShortCode = await this.urlRepository.findOne({ where: { urlShortCode } })
      exists = saveShortCode ? true : false
    }

    const stringUrl = originalUrl.toString()
    await this.urlRepository.save({ originalUrl: stringUrl, urlShortCode })

    const apiHost = this.configService.get<string>('API_HOST', 'http://localhost:3001')
    const shortenerUrl: URL = new URL(`${apiHost}/${urlShortCode}`)
    return shortenerUrl
  }

  async findUrlByShortCode(urlShortCode: string): Promise<UrlEntity> {
    const url = await this.urlRepository.findOne({ where: { urlShortCode } })
    if (!url) throw new NotFoundException('Shorten code not found')
    return url
  }

  async incrementUrlAccessCounter(url: UrlEntity): Promise<void> {
    url.accessCounter += 1
    url.lastAccessAt = new Date()
    await this.urlRepository.save(url)
  }
}

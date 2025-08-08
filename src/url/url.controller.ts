import { Body, Controller, Get, HttpCode, Param, Post, Res } from '@nestjs/common'
import express from 'express'
import { UrlService } from './url.service'
import { CreateUrlDto } from './dto/create-url.dto'
import { UrlShortCodeDto } from './dto/url-short-code.dto'

@Controller('')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @HttpCode(201)
  async createShortUrl(@Body() { originalUrl }: CreateUrlDto): Promise<{ shortUrl: URL }> {
    const shortUrl = await this.urlService.createShortUrl(originalUrl)
    return { shortUrl }
  }

  @Get(':shortCode')
  async redirectToOriginalUrl(
    @Param('shortCode') { shortCode }: UrlShortCodeDto,
    @Res() res: express.Response,
  ): Promise<void> {
    const { originalUrl } = await this.urlService.retriveOriginalUrl(shortCode)
    return res.redirect(originalUrl)
  }
}

import { Body, Controller, Get, HttpCode, Param, Post, Res, ValidationPipe } from '@nestjs/common'
import express from 'express'
import { UrlService } from './url.service'
import { CreateUrlDto } from './dtos/create-url.dto'
import { UrlShortCodeDto } from './dtos/url-short-code.dto'

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
    @Param(new ValidationPipe({ transform: true })) { shortCode }: UrlShortCodeDto,
    @Res() res: express.Response,
  ): Promise<void> {
    const url = await this.urlService.findUrlByShortCode(shortCode)
    await this.urlService.incrementUrlAccessCounter(url)
    return res.redirect(url.originalUrl)
  }
}

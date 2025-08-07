import { Body, Controller, Get, HttpCode, Param, Post, Res } from '@nestjs/common'
import express from 'express'
import { UrlService } from './url.service'
import { CreateUrlDto } from './dto/create-url.dto'

@Controller('shortener')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @HttpCode(201)
  async createShortUrl(@Body() createUrlDto: CreateUrlDto): Promise<{ shortUrl: URL }> {
    const shortUrl = await this.urlService.createShortUrl(createUrlDto)
    return { shortUrl }
  }

  @Get(':shortCode')
  redirectToOriginalUrl(@Param('shortCode') shortCode: string, @Res() res: express.Response): void {
    console.log('shortCode', shortCode)
    return res.redirect('https://www.google.com')
  }
}

import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Req,
  Res,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common'
import express from 'express'
import { UrlService } from './url.service'
import { CreateUrlDto } from './dtos/create-url.dto'
import { UrlShortCodeDto } from './dtos/url-short-code.dto'
import { UserResponseDto } from 'src/user/dtos/user-response.dto'
import { OptionalJwtAuthGuard } from 'src/auth/guards/optional-jwt-auth.guard'

@Controller('')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  @HttpCode(201)
  @UseGuards(OptionalJwtAuthGuard)
  async createShortUrl(
    @Req() req: express.Request,
    @Body() { originalUrl }: CreateUrlDto,
  ): Promise<{ shortUrl: URL }> {
    const authUser = req.user as UserResponseDto
    const shortUrl = await this.urlService.createShortUrl(originalUrl, authUser)
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

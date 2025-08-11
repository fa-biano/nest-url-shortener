import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
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
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'
import { UpdateUrlDto } from './dtos/update-url.dto'

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('urls')
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

  @Put('urls/:shortCode')
  @UseGuards(JwtAuthGuard)
  async updateOriginalUrl(
    @Req() req: express.Request,
    @Param(new ValidationPipe({ transform: true })) { shortCode }: UrlShortCodeDto,
    @Body() updateUrlDto: UpdateUrlDto,
  ): Promise<{ message: string }> {
    const authUser = req.user as UserResponseDto
    const { updateUrl } = updateUrlDto

    const originalUrl = await this.urlService.findUrlByShortCode(shortCode)
    await this.urlService.updateUrlByShortCode(originalUrl, updateUrl, authUser)
    return { message: 'URL updated successfully' }
  }

  @Delete('urls/:shortCode')
  @UseGuards(JwtAuthGuard)
  async deleteShortUrl(
    @Req() req: express.Request,
    @Param(new ValidationPipe({ transform: true })) { shortCode }: UrlShortCodeDto,
  ): Promise<{ message: string }> {
    const authUser = req.user as UserResponseDto

    const originalUrl = await this.urlService.findUrlByShortCode(shortCode)
    await this.urlService.deleteUrlByShortCode(originalUrl, authUser)
    return { message: 'URL deleted successfully' }
  }
}

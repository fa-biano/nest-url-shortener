import { Module } from '@nestjs/common'
import { UrlController } from './url.controller'
import { UrlService } from './url.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UrlEntity } from './entities/url.entity'

@Module({
  imports: [TypeOrmModule.forFeature([UrlEntity])],
  controllers: [UrlController],
  providers: [UrlService],
})
export class UrlModule {}

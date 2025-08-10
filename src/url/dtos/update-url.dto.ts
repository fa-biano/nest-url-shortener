import { IsUrl, IsNotEmpty } from 'class-validator'
import { UrlShortCodeDto } from './url-short-code.dto'

export class UpdateUrlDto extends UrlShortCodeDto {
  @IsUrl()
  @IsNotEmpty()
  updateUrl: URL
}

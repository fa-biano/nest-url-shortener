import { IsAlphanumeric, Length } from 'class-validator'

export class UrlShortCodeDto {
  @IsAlphanumeric()
  @Length(6, 6, { message: 'shortCode must have exactly 6 characters' })
  shortCode: string
}

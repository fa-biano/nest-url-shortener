import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsNotEmpty()
  @Length(8, 255)
  password: string
}

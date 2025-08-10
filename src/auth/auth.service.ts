import { Injectable, UnauthorizedException } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { LoginDto } from './dtos/login.dto'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { UserEntity } from 'src/user/entities/user.entity'
import { UserResponseDto } from 'src/user/dtos/user-response.dto'

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  private async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.userService.findUserByEmail(email)
    const isValid = await bcrypt.compare(password, user.passwordHash)

    if (!isValid) throw new UnauthorizedException('Invalid email or password.')
    return user
  }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto.email, loginDto.password)

    const payload: JwtPayload = { email: user.email, sub: user.id }
    const token = this.jwtService.sign(payload)
    return token
  }

  async validateUserByPayload(payload: JwtPayload): Promise<UserResponseDto> {
    const user = await this.userService.findUserById(payload.sub)
    return user
  }
}

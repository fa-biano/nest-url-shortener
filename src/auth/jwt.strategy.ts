import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AuthService } from './auth.service'
import { ConfigService } from '@nestjs/config'
import { JwtPayload } from './interfaces/jwt-payload.interface'
import { UserResponseDto } from '../user/dtos/user-response.dto'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET') || '',
    })
  }

  async validate(payload: JwtPayload): Promise<UserResponseDto> {
    const user = await this.authService.validateUserByPayload(payload)
    if (!user) throw new UnauthorizedException()
    return user
  }
}

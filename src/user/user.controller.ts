import { Body, Controller, Get, HttpCode, Param, Post, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserResponseDto } from './dtos/user-response.dto'
import { UserIdDto } from './dtos/user-id.dto'
import { UserEntity } from './entities/user.entity'
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @HttpCode(201)
  async createUser(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const newUser = await this.userService.createUser(createUserDto)
    return newUser
  }

  @Get(':id')
  async findUserById(@Param() { id }: UserIdDto): Promise<UserResponseDto> {
    const user = await this.userService.findUserById(id)
    return user
  }

  @Get(':id/urls')
  @UseGuards(JwtAuthGuard)
  async findUrlsByUserId(@Param() { id }: UserIdDto): Promise<UserEntity> {
    const user = await this.userService.findUrlsByUserId(id)
    return user
  }
}

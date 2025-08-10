import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common'
import { UserService } from './user.service'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserResponseDto } from './dtos/user-response.dto'
import { UserIdDto } from './dtos/user-id.dto'

@Controller('user')
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
}

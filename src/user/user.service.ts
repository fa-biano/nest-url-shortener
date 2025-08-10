import { ConflictException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { UserEntity } from './entities/user.entity'
import { Repository } from 'typeorm'
import * as bcrypt from 'bcrypt'
import { CreateUserDto } from './dtos/create-user.dto'
import { plainToClass } from 'class-transformer'
import { UserResponseDto } from './dtos/user-response.dto'

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const { email, password } = createUserDto
    const user = await this.userRepository.findOne({ where: { email } })
    if (user) throw new ConflictException('User with this email already exists.')

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await this.userRepository.save({ email, passwordHash: hashedPassword })
    return plainToClass(UserResponseDto, newUser)
  }

  async findUserById(id: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({ where: { id } })
    if (!user) throw new NotFoundException('User not found')
    return plainToClass(UserResponseDto, user)
  }
}

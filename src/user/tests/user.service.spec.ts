import { Test, TestingModule } from '@nestjs/testing'
import { UserService } from '../user.service'
import { getRepositoryToken } from '@nestjs/typeorm'
import { UserEntity } from '../entities/user.entity'
import { Repository, SelectQueryBuilder } from 'typeorm'
import { CreateUserDto } from '../dtos/create-user.dto'
import * as bcrypt from 'bcrypt'
import { UserResponseDto } from '../dtos/user-response.dto'
import { ConflictException, NotFoundException } from '@nestjs/common'
import { instanceToPlain } from 'class-transformer'

const mockUserRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  createQueryBuilder: jest.fn(),
})

jest.mock('bcrypt', () => ({
  hash: jest.fn(() => 'hashed_password'),
}))

describe('UserService', () => {
  let service: UserService
  let userRepository: Repository<UserEntity>

  const mockTestDate = new Date(2025, 8, 1)

  const mockUser: UserEntity = {
    id: 'uuid-123',
    email: 'test@example.com',
    passwordHash: 'hashed_password',
    createdAt: mockTestDate,
    updatedAt: mockTestDate,
    deletedAt: null,
  }

  const mockUserResponseDto: Partial<UserResponseDto> = {
    id: mockUser.id,
    email: mockUser.email,
    createdAt: mockUser.createdAt,
    updatedAt: mockUser.updatedAt,
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useFactory: mockUserRepository,
        },
      ],
    }).compile()

    service = module.get<UserService>(UserService)
    userRepository = module.get<Repository<UserEntity>>(getRepositoryToken(UserEntity))

    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createUser', () => {
    const createUserDto: CreateUserDto = {
      email: mockUser.email,
      password: 'testpassword123',
    }

    it('should successfully create a new user and return UserResponseDto', async () => {
      const mockFind = jest.spyOn(userRepository, 'findOne').mockResolvedValue(null)
      const saveMock = jest.spyOn(userRepository, 'save').mockResolvedValue(mockUser)

      const result = await service.createUser(createUserDto)
      const serializedResult = instanceToPlain(result)

      expect(mockFind).toHaveBeenCalledWith({ where: { email: createUserDto.email } })
      expect(bcrypt.hash).toHaveBeenCalledWith(createUserDto.password, 10)
      expect(saveMock).toHaveBeenCalledWith({
        email: createUserDto.email,
        passwordHash: 'hashed_password',
      })
      expect(serializedResult).toEqual(mockUserResponseDto)
      expect(serializedResult).not.toHaveProperty('passwordHash')
      expect(serializedResult).not.toHaveProperty('deletedAt')
    })

    it('should throw ConflictException if user with email already exists', async () => {
      const mockFind = jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser)
      const saveMock = jest.spyOn(userRepository, 'save')

      await expect(service.createUser(createUserDto)).rejects.toThrow(
        new ConflictException('User with this email already exists.'),
      )

      expect(mockFind).toHaveBeenCalledWith({ where: { email: createUserDto.email } })
      expect(saveMock).not.toHaveBeenCalled()
    })
  })

  describe('findUserById', () => {
    const userId = 'uuid-123'

    it('should successfully find a user and return UserResponseDto', async () => {
      const mockFind = jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser)

      const result = await service.findUserById(userId)
      const serializedResult = instanceToPlain(result)

      expect(mockFind).toHaveBeenCalledWith({ where: { id: userId } })
      expect(serializedResult).toEqual(mockUserResponseDto)
      expect(serializedResult).not.toHaveProperty('passwordHash')
      expect(serializedResult).not.toHaveProperty('deletedAt')
    })

    it('should throw NotFoundException if user does not exist', async () => {
      const mockFind = jest.spyOn(userRepository, 'findOne').mockResolvedValue(null)

      await expect(service.findUserById(userId)).rejects.toThrow(
        new NotFoundException('User not found'),
      )

      expect(mockFind).toHaveBeenCalledWith({ where: { id: userId } })
    })
  })

  describe('findUserByEmail', () => {
    it('should successfully find a user and return UserResponseDto', async () => {
      const mockFind = jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser)

      const result = await service.findUserByEmail(mockUser.email)

      expect(mockFind).toHaveBeenCalledWith({ where: { email: mockUser.email } })
      expect(result).toEqual(mockUser)
    })

    it('should throw NotFoundException if user does not exist', async () => {
      const mockFind = jest.spyOn(userRepository, 'findOne').mockResolvedValue(null)

      await expect(service.findUserByEmail(mockUser.email)).rejects.toThrow(
        new NotFoundException('User not found'),
      )

      expect(mockFind).toHaveBeenCalledWith({ where: { email: mockUser.email } })
    })
  })

  describe('findUrlsByUserId', () => {
    const userId = 'user-uuid-1'

    it('should return an UserEntity with urls if the user is found', async () => {
      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(mockUser),
      } as unknown as SelectQueryBuilder<UserEntity>

      const mockCreateQueryBuilder = jest
        .spyOn(userRepository, 'createQueryBuilder')
        .mockReturnValue(mockQueryBuilder)

      const result = await service.findUrlsByUserId(userId)

      expect(mockCreateQueryBuilder).toHaveBeenCalledWith('user')
      expect(result).toEqual(mockUser)
    })

    it('should throw NotFoundException if the user is not found', async () => {
      const mockQueryBuilder = {
        leftJoinAndSelect: jest.fn().mockReturnThis(),
        where: jest.fn().mockReturnThis(),
        andWhere: jest.fn().mockReturnThis(),
        orderBy: jest.fn().mockReturnThis(),
        select: jest.fn().mockReturnThis(),
        getOne: jest.fn().mockResolvedValue(null),
      } as unknown as SelectQueryBuilder<UserEntity>

      jest.spyOn(userRepository, 'createQueryBuilder').mockReturnValue(mockQueryBuilder)

      await expect(service.findUrlsByUserId(userId)).rejects.toThrow(
        new NotFoundException('User not found'),
      )
    })
  })
})

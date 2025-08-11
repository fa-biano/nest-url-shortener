import { Test, TestingModule } from '@nestjs/testing'
import { UrlService } from '../url.service'
import { IsNull, Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { UrlEntity } from '../entities/url.entity'
import { getRepositoryToken } from '@nestjs/typeorm'
import {
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { UserResponseDto } from 'src/user/dtos/user-response.dto'
import { UserEntity } from 'src/user/entities/user.entity'
import { plainToInstance } from 'class-transformer'

const mockUrlRepository = () => ({
  save: jest.fn(),
  findOne: jest.fn(),
  softDelete: jest.fn(),
})

const mockConfigService = () => ({
  get: jest.fn((key: string, defaultValue?: string) => {
    if (key === 'API_HOST') {
      return 'http://localhost:3001'
    }
    return defaultValue
  }),
})

const mockUser: UserEntity = {
  id: 'uuid-123',
  email: 'test@example.com',
  passwordHash: 'hashed_password',
  createdAt: new Date(2025, 8, 1),
  updatedAt: new Date(2025, 8, 1),
  deletedAt: null,
}

describe('UrlService', () => {
  let service: UrlService
  let urlRepository: Repository<UrlEntity>
  let configService: ConfigService

  const mockUrlEntity: UrlEntity = {
    id: '',
    urlShortCode: 'abcde1',
    originalUrl: 'https://example.com',
    accessCounter: 0,
    lastAccessAt: null,
    createdAt: new Date(2025, 8, 1),
    updatedAt: new Date(2025, 8, 1),
    deletedAt: null,
  }

  const mockAuthUser = plainToInstance(UserResponseDto, mockUser, { excludeExtraneousValues: true })

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: ConfigService,
          useFactory: mockConfigService,
        },
        {
          provide: getRepositoryToken(UrlEntity),
          useFactory: mockUrlRepository,
        },
      ],
    }).compile()

    service = module.get<UrlService>(UrlService)
    urlRepository = module.get<Repository<UrlEntity>>(getRepositoryToken(UrlEntity))
    configService = module.get<ConfigService>(ConfigService)

    jest.clearAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('createShortUrl', () => {
    const originalUrl = new URL(mockUrlEntity.originalUrl)
    const pgUniqueViolationCode = '23505'

    it('should create a short URL successfully on the first attempt', async () => {
      jest.spyOn(service as any, 'generateShortCode').mockReturnValue(mockUrlEntity.urlShortCode)
      const saveMock = jest.spyOn(urlRepository, 'save').mockResolvedValue(mockUrlEntity)

      const shortUrl = await service.createShortUrl(originalUrl, mockAuthUser)
      const apiHost = configService.get<string>('API_HOST')

      expect(saveMock).toHaveBeenCalledTimes(1)
      expect(shortUrl.toString()).toBe(`${apiHost}/${mockUrlEntity.urlShortCode}`)
    })

    it('should create a short URL successfully after a conflict', async () => {
      const newShortCode = 'abcde2'
      jest.spyOn(service as any, 'generateShortCode').mockReturnValue(newShortCode)
      const mockSave = jest
        .spyOn(urlRepository, 'save')
        .mockRejectedValueOnce({ code: pgUniqueViolationCode })
        .mockResolvedValueOnce(mockUrlEntity)

      const shortUrl = await service.createShortUrl(originalUrl, mockAuthUser)
      const apiHost = configService.get<string>('API_HOST')

      expect(mockSave).toHaveBeenCalledTimes(2)
      expect(shortUrl.toString()).toBe(`${apiHost}/${newShortCode}`)
    })

    it('should throw ConflictException if max attempts are reached', async () => {
      const maxAttempts = 5
      const saveMock = jest
        .spyOn(urlRepository, 'save')
        .mockRejectedValue({ code: pgUniqueViolationCode })

      await expect(service.createShortUrl(originalUrl, mockAuthUser)).rejects.toThrow(
        new ConflictException(
          `Failed to create ShortUrl after ${maxAttempts} attempts. Try again later.`,
        ),
      )
      expect(saveMock).toHaveBeenCalledTimes(maxAttempts)
    })

    it('should throw InternalServerErrorException for an unexpected database error', async () => {
      const saveMock = jest
        .spyOn(urlRepository, 'save')
        .mockRejectedValue({ code: 'other_error_code' })

      await expect(service.createShortUrl(originalUrl, mockAuthUser)).rejects.toThrow(
        new InternalServerErrorException('An unexpected error occurred.'),
      )
      expect(saveMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('findUrlByShortCode', () => {
    it('should return a UrlEntity if a short code is found', async () => {
      jest.spyOn(urlRepository, 'findOne').mockResolvedValue(mockUrlEntity)

      const result = await service.findUrlByShortCode(mockUrlEntity.urlShortCode)
      expect(result).toEqual(mockUrlEntity)
    })

    it('should throw NotFoundException if short code is not found', async () => {
      const findMock = jest.spyOn(urlRepository, 'findOne').mockResolvedValue(null)

      await expect(service.findUrlByShortCode('not-found')).rejects.toThrow(
        new NotFoundException('Shorten code not found'),
      )
      expect(findMock).toHaveBeenCalledWith({
        where: { urlShortCode: 'not-found', deletedAt: IsNull() },
        relations: ['user'],
      })
    })
  })

  describe('incrementUrlAccessCounter', () => {
    it('should increment access counter and update last access date', async () => {
      const saveMock = jest.spyOn(urlRepository, 'save').mockResolvedValue(mockUrlEntity)
      await service.incrementUrlAccessCounter(mockUrlEntity)

      expect(mockUrlEntity.accessCounter).toBe(1)
      expect(mockUrlEntity.lastAccessAt).toBeInstanceOf(Date)
      expect(saveMock).toHaveBeenCalledTimes(1)
    })
  })

  describe('updateUrlByShortCode', () => {
    const mockUpdateUrl = new URL('https://new-original.com')

    it('should update the URL if the user is the owner', async () => {
      const mockValidateOwner = jest.spyOn(service as any, 'validateUrlOwner')

      const updatedUrlEntity = { ...mockUrlEntity, originalUrl: mockUpdateUrl.toString() }
      const saveMock = jest.spyOn(urlRepository, 'save').mockResolvedValue(updatedUrlEntity)

      await service.updateUrlByShortCode(mockUrlEntity, mockUpdateUrl, mockAuthUser)

      expect(saveMock).toHaveBeenCalledTimes(1)
      expect(saveMock).toHaveBeenCalledWith(updatedUrlEntity)
      expect(mockValidateOwner).toHaveBeenCalledWith(mockUrlEntity, mockAuthUser)
    })

    it('should throw UnauthorizedException if the user is not the owner', async () => {
      jest.spyOn(service as any, 'validateUrlOwner').mockImplementationOnce(() => {
        throw new UnauthorizedException('You do not have permission to manage this URL.')
      })

      const updatedUrlEntity = { ...mockUrlEntity, originalUrl: mockUpdateUrl.toString() }
      const saveMock = jest.spyOn(urlRepository, 'save').mockResolvedValue(updatedUrlEntity)

      await expect(
        service.updateUrlByShortCode(mockUrlEntity, mockUpdateUrl, mockAuthUser),
      ).rejects.toThrow(new UnauthorizedException('You do not have permission to manage this URL.'))

      expect(saveMock).not.toHaveBeenCalled()
    })
  })

  describe('deleteUrlByShortCode', () => {
    it('should soft delete the URL if the user is the owner', async () => {
      const mockValidateOwner = jest.spyOn(service as any, 'validateUrlOwner')

      const deleteMock = jest.spyOn(urlRepository, 'softDelete').mockResolvedValue({
        affected: 1,
        raw: [],
        generatedMaps: [],
      })

      await service.deleteUrlByShortCode(mockUrlEntity, mockAuthUser)

      expect(deleteMock).toHaveBeenCalledTimes(1)
      expect(deleteMock).toHaveBeenCalledWith({ urlShortCode: mockUrlEntity.urlShortCode })
      expect(mockValidateOwner).toHaveBeenCalledWith(mockUrlEntity, mockAuthUser)
    })

    it('should throw UnauthorizedException if the user is not the owner', async () => {
      jest.spyOn(service as any, 'validateUrlOwner').mockImplementationOnce(() => {
        throw new UnauthorizedException('You do not have permission to manage this URL.')
      })

      const deletMock = jest.spyOn(urlRepository, 'softDelete')

      await expect(service.deleteUrlByShortCode(mockUrlEntity, mockAuthUser)).rejects.toThrow(
        new UnauthorizedException('You do not have permission to manage this URL.'),
      )

      expect(deletMock).not.toHaveBeenCalled()
    })
  })
})

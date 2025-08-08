import { Test, TestingModule } from '@nestjs/testing'
import { UrlService } from './url.service'
import { Repository } from 'typeorm'
import { ConfigService } from '@nestjs/config'
import { UrlEntity } from './url.entity'
import { getRepositoryToken } from '@nestjs/typeorm'

describe('UrlService', () => {
  let service: UrlService
  // eslint-disable-next-line
  let urlRepository: Repository<UrlEntity>
  // eslint-disable-next-line
  let configService: ConfigService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'API_HOST') {
                return 'http://localhost:3001'
              }
              return null
            }),
          },
        },
        {
          provide: getRepositoryToken(UrlEntity),
          useClass: Repository,
        },
      ],
    }).compile()

    service = module.get<UrlService>(UrlService)
    urlRepository = module.get<Repository<UrlEntity>>(getRepositoryToken(UrlEntity))
    configService = module.get<ConfigService>(ConfigService)
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})

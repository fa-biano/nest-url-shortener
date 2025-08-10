import { Module } from '@nestjs/common'
import { UrlModule } from './url/url.module'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { UserModule } from './user/user.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const isDevEnv = configService.get<string>('NODE_ENV') === 'dev'

        return {
          type: 'postgres',
          host: configService.get<string>('DB_HOST'),
          port: parseInt(configService.get<string>('DB_PORT', '5432'), 10),
          username: configService.get<string>('DB_USER'),
          password: configService.get<string>('DB_PASSWORD'),
          database: configService.get<string>('DB_NAME'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          autoLoadEntities: true,
          synchronize: isDevEnv ? true : false,
          logging: isDevEnv ? ['query', 'error', 'schema'] : ['error'],
          ssl: isDevEnv ? undefined : { rejectUnauthorized: false },
          extra: {
            max: parseInt(configService.get<string>('DB_POOL_MAX', '20'), 10),
            idleTimeoutMillis: 30000,
            connectionTimeoutMillis: 15000,
          },
        }
      },
      inject: [ConfigService],
    }),
    UrlModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

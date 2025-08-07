import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  const PORT = process.env.PORT ?? 3001

  app.useGlobalPipes(new ValidationPipe())

  await app.listen(PORT, () => {
    console.info('Server is running on port', PORT)
  })
}

void bootstrap()

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as helmet from 'helmet'
import { join } from 'path';


async function bootstrap() {

  const app = await NestFactory.create(AppModule);
  app.use(helmet())
  app.enableCors()
  await app.listen(5000);
}
bootstrap();

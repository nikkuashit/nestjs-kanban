import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common'
import { AppModule } from './app.module';
import * as config from 'config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path'

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'static'));
  if( process.env.NODE_ENV === 'development'){
  app.enableCors()};
  const serverConfig = config.get('server');
  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
  
  logger.log(`Application listening on port ${port}`)
}
bootstrap();

import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { ServiceExceptionInterceptor } from './core/errors/service-exception.interceptor';

function setUpConfigs(app: INestApplication) {
  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: process.env.NODE_ENV === 'development',
    }),
  );

  app.useGlobalInterceptors(new ServiceExceptionInterceptor());
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setUpConfigs(app);
  await app.listen(3000);
}

bootstrap();

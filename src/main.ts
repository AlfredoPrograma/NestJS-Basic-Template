import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { ServiceExceptionInterceptor } from '@/core/errors/service-exception/service-exception.interceptor';

import { AppModule } from './app.module';

function setUpConfigs(app: INestApplication) {
  const isModeDebug = process.env.NODE_ENV === 'development';

  app.setGlobalPrefix('/api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      enableDebugMessages: isModeDebug,
    }),
  );

  app.useGlobalInterceptors(new ServiceExceptionInterceptor(isModeDebug));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setUpConfigs(app);
  await app.listen(3000);
}

bootstrap();

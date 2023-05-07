import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { ExampleService } from './example.service';
import { ExampleController } from './example.controller';

@Module({
  controllers: [ExampleController],
  providers: [ExampleService, ConfigService],
})
export class ExampleModule {}

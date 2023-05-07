import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from '@/core/services/type-orm-config.service';

import { ExampleModule } from '@/example/example.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    ExampleModule,
  ],
  controllers: [],
  providers: [TypeOrmConfigService],
})
export class AppModule {}

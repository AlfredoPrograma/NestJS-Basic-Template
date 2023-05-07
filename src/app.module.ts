import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from '@/core/services/type-orm-config.service';
import { EncryptService } from '@/core/services/encrypt.service';

import { ExampleModule } from '@/example/example.module';
import { AuthModule } from '@/auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    ExampleModule,
    AuthModule,
  ],
  controllers: [],
  providers: [TypeOrmConfigService, EncryptService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TypeOrmConfigService } from '@/core/config/type-orm-config.service';

import { ExampleModule } from '@/example/example.module';
import { AuthModule } from '@/auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useClass: TypeOrmConfigService,
    }),
    ExampleModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [TypeOrmConfigService],
})
export class AppModule {}

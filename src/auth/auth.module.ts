import { Module } from '@nestjs/common';

import { EncryptService } from '@/core/services/encrypt.service';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '@/users/users.service';
import { UsersModule } from '@/users/users.module';
import { User } from '@/core/models/user';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, EncryptService, UsersService],
})
export class AuthModule {}

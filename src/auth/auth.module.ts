import { Module } from '@nestjs/common';

import { EncryptService } from '@/auth/encrypt.service';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersService } from '@/users/users.service';
import { User } from '@/core/models/user';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, EncryptService, UsersService],
})
export class AuthModule {}

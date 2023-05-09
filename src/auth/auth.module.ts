import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { EncryptService } from 'auth/encrypt.service';
import { UsersService } from 'users/users.service';
import { User } from 'core/models/user';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, EncryptService, UsersService],
})
export class AuthModule {}

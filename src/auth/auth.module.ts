import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EncryptService } from './encrypt.service';
import { UsersService } from '@/users/users.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, EncryptService, UsersService],
})
export class AuthModule {}

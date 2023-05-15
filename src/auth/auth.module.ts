import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { EncryptService } from './encrypt.service';

@Module({
  controllers: [AuthController],
  providers: [AuthService, EncryptService],
})
export class AuthModule {}

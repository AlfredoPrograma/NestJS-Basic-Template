import { Body, Controller, Get, Post, Req } from '@nestjs/common';

import { CreateUserDto, SignInUserDto } from '@/core/models/user';

import { AuthService } from './auth.service';
import { Request } from 'express';
import { PrivateAccess } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() payload: CreateUserDto) {
    return await this.authService.signUp(payload);
  }

  @Post('sign-in')
  async signIn(@Body() payload: SignInUserDto) {
    return await this.authService.signIn(payload);
  }

  @Get('test')
  @PrivateAccess()
  async test(@Req() req: Request) {
    return req?.user;
  }
}

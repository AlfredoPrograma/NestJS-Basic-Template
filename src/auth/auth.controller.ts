import { Body, Controller, Post } from '@nestjs/common';

import { CreateUserDto, SignInUserDto } from '@/core/models/user';

import { AuthService } from './auth.service';

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
}

import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';

import { SerializeInterceptor } from 'core/interceptors/SerializeInterceptor';
import { CreateUserDto } from 'core/models/user';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @UseInterceptors(new SerializeInterceptor(['password']))
  async signUp(@Body() data: CreateUserDto) {
    const user = await this.authService.signUp(data);

    return { user };
  }
}

import { Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'core/models/user';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  async signUp(data: CreateUserDto) {
    const user = await this.authService.signUp(data);

    return { user };
  }
}

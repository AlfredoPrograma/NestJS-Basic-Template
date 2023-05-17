import { CreateUserDto } from '@/core/models/user';
import { Body, Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  async signUp(@Body() payload: CreateUserDto) {
    return this.authService.signUp(payload);
  }
}

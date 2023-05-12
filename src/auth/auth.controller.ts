import { Body, Controller, Post, BadRequestException } from '@nestjs/common';
import { HideResponseFields } from 'core/decorators/hide-response-fields.decorator';
import { UserErrors } from 'core/errors/users.errors';

import { CreateUserDto } from 'core/models/user';

import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-up')
  @HideResponseFields(['password'])
  async signUp(@Body() data: CreateUserDto) {
    try {
      const user = await this.authService.signUp(data);

      return { user };
    } catch (error) {
      const { message } = error;

      if (message === UserErrors.USER_ALREADY_REGISTERED) {
        throw new BadRequestException(message);
      }
    }
  }
}

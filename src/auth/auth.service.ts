import { CreateUserDto } from '../core/models/user';
import { Injectable } from '@nestjs/common';

import { EncryptService } from '../core/services/encrypt.service';
import { AuthServiceAdapter } from '@/core/adapters/auth-service.adapter';
import { UsersService } from '@/users/users.service';

@Injectable()
export class AuthService implements AuthServiceAdapter {
  constructor(
    private encryptService: EncryptService,
    private usersService: UsersService,
  ) {}

  async signUp({ password, email }: CreateUserDto) {
    const encryptedPassword = await this.encryptService.hashPassword(password);

    const newUser: CreateUserDto = {
      email,
      password: encryptedPassword,
    };

    const createdUser = await this.usersService.create(newUser);

    return createdUser;
  }
}

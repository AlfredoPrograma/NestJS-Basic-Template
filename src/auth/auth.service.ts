import { Injectable } from '@nestjs/common';

import { AuthServiceAdapter } from 'core/adapters/services/auth-service.adapter';
import { UsersService } from 'users/users.service';
import { CreateUserDto } from 'core/models/user';

import { EncryptService } from './encrypt.service';

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

    const registeredUser = await this.usersService.create(newUser);

    return registeredUser;
  }
}

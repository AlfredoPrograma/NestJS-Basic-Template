import { Injectable } from '@nestjs/common';

import {
  CreateUserDto,
  SignInResponse,
  SignInUserDto,
  User,
} from '@/core/models/user';
import { UsersService } from '@/users/users.service';

import { EncryptService } from './encrypt.service';
import { InvalidCredentialsException } from './errors/auth.errors';

@Injectable()
export class AuthService {
  constructor(
    private readonly encryptService: EncryptService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(payload: CreateUserDto): Promise<User> {
    const encryptedPassword = await this.encryptService.encryptPassword(
      payload.password,
    );

    const newUser = await this.usersService.create({
      ...payload,
      password: encryptedPassword,
    });

    return newUser;
  }

  async signIn(payload: SignInUserDto): Promise<SignInResponse> {
    const foundUser = await this.usersService.findByEmail(payload.email);

    const isValidPassword = await this.encryptService.validatePassword(
      payload.password,
      foundUser?.password ?? '',
    );

    if (!isValidPassword || !foundUser) {
      throw new InvalidCredentialsException();
    }

    // const token = await this.encryptService.generateToken(foundUser.id);

    return {
      token: 'TODO ADD TOKEN',
      user: {
        email: foundUser.email,
        id: foundUser.id,
      },
    };
  }
}

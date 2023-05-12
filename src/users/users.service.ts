import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersServiceAdapter } from 'core/adapters/services/users-service.adapter';
import { CreateUserDto, User } from 'core/models/user';
import { UserErrors } from 'core/errors/users.errors';
@Injectable()
export class UsersService implements UsersServiceAdapter {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const foundUser = await this.usersRepository.findOne({ where: { email } });

    return foundUser;
  }

  async create(user: CreateUserDto): Promise<User | UserErrors> {
    const foundUser = await this.findByEmail(user.email);

    if (foundUser) throw new Error(UserErrors.USER_ALREADY_REGISTERED);

    return await this.usersRepository.save(user);
  }
}

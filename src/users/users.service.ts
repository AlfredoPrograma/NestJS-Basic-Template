import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersServiceAdapter } from 'core/adapters/services/users-service.adapter';
import { CreateUserDto, User } from 'core/models/user';
@Injectable()
export class UsersService implements UsersServiceAdapter {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    return await this.usersRepository.save(user);
  }
}

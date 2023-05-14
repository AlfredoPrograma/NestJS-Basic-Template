import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from '@/core/models/entities';
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
  ) {}

  async findByEmail(email: string): Promise<User> {
    const foundUser = await this.usersRepository.findOne({ where: { email } });

    if (!foundUser) {
      throw new Error('User not found');
    }

    return foundUser;
  }
}

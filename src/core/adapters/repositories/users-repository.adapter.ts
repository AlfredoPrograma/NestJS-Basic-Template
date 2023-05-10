import { CreateUserDto, User } from 'core/models/user';
import { FindOneOptions } from 'typeorm';

export interface UsersRepositoryAdapter {
  save(data: CreateUserDto): Promise<User>;
  findOne(options: FindOneOptions<User>): Promise<User>;
}

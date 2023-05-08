import { CreateUserDto, User } from '../models/user';

export interface UsersServiceAdapter {
  create(user: CreateUserDto): Promise<User>;
}

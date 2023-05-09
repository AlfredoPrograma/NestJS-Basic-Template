import { CreateUserDto, User } from 'core/models/user';

export interface UsersServiceAdapter {
  create(user: CreateUserDto): Promise<User>;
}

import { UserErrors } from 'core/errors/users.errors';
import { CreateUserDto, User } from 'core/models/user';

export interface UsersServiceAdapter {
  create(user: CreateUserDto): Promise<User | UserErrors>;
  findByEmail(email: string): Promise<User>;
}

import { UserErrors } from 'core/errors/users.errors';
import { CreateUserDto, User } from '../../models/user';

export interface AuthServiceAdapter {
  signUp(data: CreateUserDto): Promise<User | UserErrors>;
}

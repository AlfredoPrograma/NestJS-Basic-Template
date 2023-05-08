import { CreateUserDto, User } from '../models/user';

export interface AuthServiceAdapter {
  signUp(data: CreateUserDto): Promise<User>;
}

import { CreateUserDto, User } from 'core/models/user';

export const createUserStub: CreateUserDto = {
  email: 'stub-user@test.com',
  password: 'stub-password',
};

export const newUserStub: User = {
  email: createUserStub.email,
  password: `hashed-${createUserStub.password}`,
  userId: 'user-id',
};

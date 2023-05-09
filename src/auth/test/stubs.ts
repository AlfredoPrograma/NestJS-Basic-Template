import { CreateUserDto, User } from 'core/models/user';

export const CreateUserDtoStub: CreateUserDto = {
  email: 'stub-user@test.com',
  password: 'stub-password',
};

export const NewUserStub: User = {
  email: CreateUserDtoStub.email,
  password: `hashed-${CreateUserDtoStub.password}`,
  userId: '123',
};

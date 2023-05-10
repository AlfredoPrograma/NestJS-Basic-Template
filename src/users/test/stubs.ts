import { CreateUserDto, User } from 'core/models/user';

export const createUserDtoStub: CreateUserDto = {
  email: 'test@mail.com',
  password: '123456',
};

export const userStub: User = {
  ...createUserDtoStub,
  userId: 'user-id',
};

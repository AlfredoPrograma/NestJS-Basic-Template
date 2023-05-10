import { UsersRepositoryAdapter } from 'core/adapters/repositories/users-repository.adapter';
import { CreateUserDto, User } from 'core/models/user';
import { FindOneOptions, FindOptionsWhere } from 'typeorm';
import { registeredUser } from './stubs';

export const MockUsersRepository: UsersRepositoryAdapter = {
  save: (data: CreateUserDto) => {
    return Promise.resolve({ ...data, userId: 'user-id' });
  },

  findOne: (options: FindOneOptions<User>) => {
    const { email } = options.where as FindOptionsWhere<User>;

    if (email !== registeredUser.email) {
      return Promise.resolve(null);
    }

    return Promise.resolve(registeredUser);
  },
};

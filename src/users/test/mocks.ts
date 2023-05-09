import { UsersRepositoryAdapter } from 'core/adapters/repositories/users-repository.adapter';

export const MockUsersRepository: UsersRepositoryAdapter = {
  create: (user: any) => {
    return Promise.resolve({ id: 1, name: 'test' });
  },
};

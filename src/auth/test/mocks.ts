import { EncryptServiceAdapter } from 'core/adapters/services/encrypt-service.adapter';
import { UsersServiceAdapter } from 'core/adapters/services/users-service.adapter';
import { CreateUserDto, User } from 'core/models/user';
import { newUserStub } from './stubs';
export class MockEncryptService implements EncryptServiceAdapter {
  async hashPassword(password: string) {
    return `hashed-${password}`;
  }

  async comparePassword(password: string, hash: string) {
    return password === hash;
  }
}

export class MockUsersService implements UsersServiceAdapter {
  create(user: CreateUserDto) {
    return Promise.resolve({
      email: user.email,
      password: user.password,
      userId: 'user-id',
    });
  }

  findByEmail(email: string): Promise<User> {
    if (email === newUserStub.email) {
      return Promise.resolve(newUserStub);
    }

    return Promise.resolve(null);
  }
}

import { EncryptServiceAdapter } from 'core/adapters/encrypt-service.adapter';
import { UsersServiceAdapter } from 'core/adapters/users-service.adapter';
import { CreateUserDto } from 'core/models/user';
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
      password: 'hashed-stub-password',
      userId: '123',
    });
  }
}

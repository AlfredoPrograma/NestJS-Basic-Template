import { IEncryptService } from '@/core/services/encrypt.service';

export class MockEncryptService implements IEncryptService {
  async hashPassword(password: string) {
    return password;
  }

  async comparePassword(password: string, hash: string) {
    return password === hash;
  }
}

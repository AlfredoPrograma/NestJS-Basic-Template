import * as bcrypt from 'bcrypt';
import { Injectable } from '@nestjs/common';

import { EncryptServiceAdapter } from 'core/adapters/encrypt-service.adapter';

@Injectable()
export class EncryptService implements EncryptServiceAdapter {
  private DIFFICULTY = 12;
  private encrypter = bcrypt;

  async hashPassword(password: string): Promise<string> {
    return await this.encrypter.hash(password, this.DIFFICULTY);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await this.encrypter.compare(password, hash);
  }
}

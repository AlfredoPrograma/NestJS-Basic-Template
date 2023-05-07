import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class EncryptService {
  private DIFFICULTY = 12;
  private encrypter = bcrypt;

  async hashPassword(password: string): Promise<string> {
    return await this.encrypter.hash(password, this.DIFFICULTY);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await this.encrypter.compare(password, hash);
  }
}

import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

export interface IEncryptService {
  hashPassword(password: string): Promise<string>;
  comparePassword(password: string, hash: string): Promise<boolean>;
}

@Injectable()
export class EncryptService implements IEncryptService {
  private DIFFICULTY = 12;
  private encrypter = bcrypt;

  async hashPassword(password: string): Promise<string> {
    return await this.encrypter.hash(password, this.DIFFICULTY);
  }

  async comparePassword(password: string, hash: string): Promise<boolean> {
    return await this.encrypter.compare(password, hash);
  }
}

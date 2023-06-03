import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class EncryptService {
  private jwt = jwt;
  private encrypter = bcrypt;

  async encryptPassword(password: string): Promise<string> {
    const encryptedPassword = await this.encrypter.hash(password, 13);

    return encryptedPassword;
  }

  async validatePassword(
    plainPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    const isValid = await this.encrypter.compare(
      plainPassword,
      encryptedPassword,
    );

    return isValid;
  }

  async generateToken(payload: string): Promise<string> {
    const token = await this.jwt.sign(payload, 'secreto');

    return token;
  }
}

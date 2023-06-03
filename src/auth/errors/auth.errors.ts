import { ServiceException } from '@/core/errors/service-exception.error';
import { UnauthorizedException } from '@nestjs/common';

export enum AuthErrorsMessages {
  INVALID_CREDENTIALS = 'Invalid credentials',
}

export class InvalidCredentialsException extends ServiceException {
  constructor() {
    super();
    this.message = AuthErrorsMessages.INVALID_CREDENTIALS;
  }

  toHttp() {
    return new UnauthorizedException(this.message);
  }
}

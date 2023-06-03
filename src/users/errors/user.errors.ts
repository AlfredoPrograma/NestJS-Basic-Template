import { ServiceException } from '@/core/errors/service-exception.error';
import { ConflictException } from '@nestjs/common';

export class UserAlreadyRegisteredError extends ServiceException {
  constructor() {
    super();
  }

  toHttp() {
    return new ConflictException('User already registered');
  }
}

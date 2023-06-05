import { ServiceException } from '@/core/errors/service-exception/service-exception.error';

import { UnauthorizedException } from '@nestjs/common';

export enum JwtErrorMessages {
  MALFORMED_TOKEN = 'Malformed token',
  INVALID_TOKEN = 'Invalid token',
}

export class MalformedTokenException extends ServiceException {
  constructor() {
    super();
    this.message = JwtErrorMessages.MALFORMED_TOKEN;
  }

  toHttp() {
    return new UnauthorizedException(this.message);
  }
}

export class InvalidTokenException extends ServiceException {
  constructor() {
    super();
    this.message = JwtErrorMessages.INVALID_TOKEN;
  }

  toHttp() {
    return new UnauthorizedException(this.message);
  }
}

import { HttpException } from '@nestjs/common';

export function isServiceException(error: Error): error is ServiceException {
  return error.name === 'SERVICE_EXCEPTION';
}

export abstract class ServiceException extends Error {
  constructor() {
    super();
    this.name = 'SERVICE_EXCEPTION';
  }

  abstract toHttp(): HttpException;
}

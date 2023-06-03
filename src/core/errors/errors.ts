import { HttpException } from '@nestjs/common';

export abstract class ServiceException extends Error {
  constructor() {
    super();
    this.name = 'SERVICE_EXCEPTION';
  }

  abstract toHttp(): HttpException;
}

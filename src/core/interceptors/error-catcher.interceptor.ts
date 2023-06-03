import {
  CallHandler,
  ExecutionContext,
  InternalServerErrorException,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, catchError } from 'rxjs';

import { isServiceException } from '@/core/errors/types';

export class ErrorCatcherInterceptor implements NestInterceptor {
  intercept(
    _: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error: Error) => {
        if (isServiceException(error)) {
          throw error.toHttp();
        }

        throw new InternalServerErrorException();
      }),
    );
  }
}

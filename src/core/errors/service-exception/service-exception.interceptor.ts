import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, catchError } from 'rxjs';
import { isServiceException } from './service-exception.error';

export class ServiceExceptionInterceptor implements NestInterceptor {
  constructor(private readonly isModeDebug) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<Error>,
  ): Observable<Error> {
    return next.handle().pipe(
      catchError((error: Error) => {
        const contextType = context.getType();

        if (this.isModeDebug) {
          console.log(error);
        }

        if (isServiceException(error) && contextType === 'http') {
          throw error.toHttp();
        }

        throw error;
      }),
    );
  }
}

import { CallHandler, ExecutionContext, HttpException } from '@nestjs/common';
import { createMock } from '@golevelup/ts-jest';
import { lastValueFrom, throwError } from 'rxjs';

import { ServiceExceptionInterceptor } from '../service-exception.interceptor';
import { ServiceException } from '../service-exception.error';

class TestServiceException extends ServiceException {
  constructor() {
    super();
    this.message = 'Test exception';
  }

  toHttp() {
    return new HttpException(this.message, 400);
  }
}

describe('ServiceExceptionInterceptor', () => {
  let interceptor: ServiceExceptionInterceptor;

  const mockExecutionContext = createMock<ExecutionContext>();
  const mockCallHandler = createMock<CallHandler>({
    handle: () => throwError(() => new TestServiceException()),
  });

  beforeEach(() => {
    interceptor = new ServiceExceptionInterceptor(false);
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });

  it('should throw http exception', async () => {
    // Arrange
    mockCallHandler.handle.mockImplementationOnce(() =>
      throwError(() => new TestServiceException()),
    );

    // Act
    const errorObservable = interceptor.intercept(
      mockExecutionContext,
      mockCallHandler,
    );

    // Assert
    await expect(lastValueFrom(errorObservable)).rejects.toThrowError(
      new TestServiceException().toHttp(),
    );
  });

  it('should throw given error as default', async () => {
    // Arrange
    const nonServiceExceptionError = new Error('Non service exception error');
    mockCallHandler.handle.mockImplementationOnce(() =>
      throwError(() => nonServiceExceptionError),
    );

    // Act
    const errorObservable = interceptor.intercept(
      mockExecutionContext,
      mockCallHandler,
    );

    // Assert
    await expect(lastValueFrom(errorObservable)).rejects.toThrowError(
      nonServiceExceptionError,
    );
  });
});

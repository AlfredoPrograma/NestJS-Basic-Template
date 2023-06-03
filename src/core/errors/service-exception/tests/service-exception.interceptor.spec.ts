import { ServiceExceptionInterceptor } from '../service-exception.interceptor';

describe('ServiceExceptionInterceptor', () => {
  let interceptor: ServiceExceptionInterceptor;

  beforeEach(() => {
    interceptor = new ServiceExceptionInterceptor();
  });

  it('should be defined', () => {
    expect(interceptor).toBeDefined();
  });
});

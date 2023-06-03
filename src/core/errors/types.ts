import { ServiceException } from './errors';

export type ErrorHandlers<T extends string> = Record<T, (e: Error) => void>;

export function isServiceException(error: Error): error is ServiceException {
  return error.name === 'SERVICE_EXCEPTION';
}

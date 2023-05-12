import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'core/interceptors/serializer.interceptor';

export function HideResponseFields(fields: string[]) {
  return UseInterceptors(new SerializeInterceptor(fields));
}

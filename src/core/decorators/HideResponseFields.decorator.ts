import { UseInterceptors } from '@nestjs/common';
import { SerializeInterceptor } from 'core/interceptors/SerializeInterceptor';

export function HideResponseFields(fields: string[]) {
  return UseInterceptors(new SerializeInterceptor(fields));
}

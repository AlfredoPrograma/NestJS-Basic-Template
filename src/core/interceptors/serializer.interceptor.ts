import { ExecutionContext, NestInterceptor, CallHandler } from '@nestjs/common';
import { map, Observable } from 'rxjs';

export class SerializeInterceptor implements NestInterceptor {
  constructor(private omitKeys: string[]) {}

  private serialize(root: Record<string, any>, merged: Record<string, any>) {
    if (!root) return;

    for (const key of Object.keys(root)) {
      if (typeof root[key] === 'object') {
        const nestedSerialized = {};

        this.serialize(root[key as string], nestedSerialized);

        merged[key] = nestedSerialized;
        continue;
      }

      if (!this.omitKeys.includes(key)) {
        merged[key] = root[key];
      }
    }
  }

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const serialized = {};
        this.serialize(data, serialized);

        return serialized;
      }),
    );
  }
}

import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExampleService {
  constructor(private configService: ConfigService<Environment>) {}

  getRunningEnvironment(): string {
    return this.configService.get('NODE_ENV');
  }
}

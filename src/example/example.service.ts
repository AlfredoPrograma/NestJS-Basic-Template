import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ExampleService {
  constructor(private configService: ConfigService) {}

  getRunningEnvironment() {
    return this.configService.get<string>('NODE_ENV');
  }
}

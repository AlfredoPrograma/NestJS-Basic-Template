import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { ExampleController } from '../example.controller';
import { ExampleService } from '../example.service';
import { configServiceMock, envStub } from './mocks';

describe('ExampleController', () => {
  let controller: ExampleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ExampleController],
      providers: [
        ExampleService,
        {
          provide: ConfigService,
          useValue: configServiceMock,
        },
      ],
    }).compile();

    controller = module.get<ExampleController>(ExampleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return running environment', () => {
    expect(controller.getRunningEnvironment()).toBe(envStub['NODE_ENV']);
  });
});

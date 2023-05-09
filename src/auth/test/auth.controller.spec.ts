import { Test, TestingModule } from '@nestjs/testing';

import { EncryptService } from 'auth/encrypt.service';
import { UsersService } from 'users/users.service';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

import { MockEncryptService, MockUsersService } from './mocks';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        {
          provide: UsersService,
          useClass: MockUsersService,
        },
        {
          provide: EncryptService,
          useClass: MockEncryptService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

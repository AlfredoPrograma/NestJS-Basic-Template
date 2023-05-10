import { Test, TestingModule } from '@nestjs/testing';

import { EncryptService } from 'auth/encrypt.service';
import { User } from 'core/models/user';
import { UsersService } from 'users/users.service';

import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

import { MockEncryptService, MockUsersService } from './mocks';
import { createUserStub, newUserStub } from './stubs';

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

  it('should return a successful user sign up response', async () => {
    const result = await controller.signUp(createUserStub);

    const expected: { user: User } = {
      user: newUserStub,
    };

    expect(result).toEqual(expected);
  });
});

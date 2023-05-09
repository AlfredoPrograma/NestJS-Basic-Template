import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';

import { EncryptService } from '../encrypt.service';
import { MockEncryptService, MockUsersService } from './mocks';
import { CreateUserDtoStub, NewUserStub } from './stubs';
import { UsersService } from 'users/users.service';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { useClass: MockEncryptService, provide: EncryptService },
        { useClass: MockUsersService, provide: UsersService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create new user', async () => {
    // act
    const result = await service.signUp(CreateUserDtoStub);

    // assert
    expect(result).toEqual(NewUserStub);
  });
});

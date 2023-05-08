import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';

import { EncryptService } from '../encrypt.service';
import { User } from '../../core/models/user';
import { MockEncryptService, MockUsersRepository } from './mocks';
import { CreateUserDtoStub, NewUserStub } from './stubs';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { useClass: MockEncryptService, provide: EncryptService },
        { useClass: MockUsersRepository, provide: getRepositoryToken(User) },
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

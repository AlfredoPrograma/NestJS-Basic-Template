import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { User } from 'core/models/user';

import { UsersService } from '../users.service';
import { MockUsersRepository } from './mocks';
import { createUserDtoStub, userStub } from './stubs';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: MockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find a user by email', async () => {
    const result = await service.findByEmail(userStub.email);

    expect(result).toEqual(userStub);
  });

  it('should return null if user was not found by email', async () => {
    const result = await service.findByEmail('random-email');

    expect(result).toBeNull();
  });

  it('should create a user', async () => {
    const result = await service.create(createUserDtoStub);

    expect(result).toEqual(userStub);
  });
});

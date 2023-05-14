import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { createMock } from '@golevelup/ts-jest';

import { UsersService } from '../users.service';
import { User } from '@/core/models/entities';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('UsersService', () => {
  let service: UsersService;

  const mockUsersRepository = createMock<Repository<User>>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserErrors } from 'core/errors/users.errors';

import { CreateUserDto, User } from 'core/models/user';

import { UsersService } from '../users.service';
import { MockUsersRepository } from './mocks';
import { registeredUser } from './stubs';

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
    const result = await service.findByEmail(registeredUser.email);

    expect(result).toEqual(registeredUser);
  });

  it('should return null if user was not found by email', async () => {
    const result = await service.findByEmail('unregistered-email');

    expect(result).toBeNull();
  });

  it('should return "user already registered error" if user was found by email during creation', async () => {
    const user: CreateUserDto = {
      email: registeredUser.email,
      password: registeredUser.password,
    };

    const result = await service.create(user);

    expect(result).toEqual(UserErrors.USER_ALREADY_REGISTERED);
  });

  it('should create a user', async () => {
    const newUser: CreateUserDto = {
      email: 'new@test.com',
      password: '123456',
    };

    const result = await service.create(newUser);

    expect(result).toEqual({ ...newUser, userId: 'user-id' });
  });
});

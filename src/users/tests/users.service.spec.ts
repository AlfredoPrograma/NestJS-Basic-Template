import { Test, TestingModule } from '@nestjs/testing';

import { Repository } from 'typeorm';
import { createMock } from '@golevelup/ts-jest';

import { UsersService } from '../users.service';
import { User } from '@/core/models/entities';
import { getRepositoryToken } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';

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

  it('should return found user by email', async () => {
    // Arrange
    const generateUser = () => {
      const user = new User();
      user.email = 'test@mail.com';
      user.id = randomUUID();
      user.password = 'secretPassword';

      return user;
    };

    const email = 'test@mail.com';
    const expectedUser = generateUser();

    mockUsersRepository.findOne.mockResolvedValueOnce(expectedUser);

    // Act
    const foundUser = await service.findByEmail(email);

    // Assert
    expect(foundUser).toEqual(expectedUser);
  });

  it('should throw error if user not found', async () => {
    // Arrange
    const email = 'test@mail.com';
    const expectedError = new Error('User not found');

    mockUsersRepository.findOne.mockResolvedValueOnce(null);

    // Act / Assert
    await expect(service.findByEmail(email)).rejects.toThrow(expectedError);
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { EncryptService } from '../encrypt.service';

describe('TestService', () => {
  let service: EncryptService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EncryptService],
    }).compile();

    service = module.get<EncryptService>(EncryptService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should encrypt password', async () => {
    // arrange
    const password = 's3cret-passw0rd';

    // act
    const hash = await service.hashPassword(password);

    // assert
    expect(hash).toBeDefined();
    expect(hash).not.toEqual(password);
  });

  it('should return true in valid password', async () => {
    // arrange
    const password = 's3cret-passw0rd';
    const hash = await service.hashPassword(password);

    // act
    const isValid = await service.comparePassword(password, hash);

    // assert
    expect(isValid).toBe(true);
  });

  it('should return false in invalid password', async () => {
    // arrange
    const password = 's3cret-passw0rd';
    const hash = await service.hashPassword(password);

    // act
    const isValid = await service.comparePassword('invalid-password', hash);

    // assert
    expect(isValid).toBe(false);
  });
});

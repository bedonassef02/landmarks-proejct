import { Test } from '@nestjs/testing';
import * as bcrypt from 'bcrypt';
import { PasswordService } from './password.service';

// Mock the bcrypt module
jest.mock('bcrypt');

describe('PasswordService', () => {
  let passwordService: PasswordService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [PasswordService],
    }).compile();

    passwordService = moduleRef.get<PasswordService>(PasswordService);
  });

  describe('hash', () => {
    it('should hash the password', async () => {
      const password = 'testPassword';
      const hashedPassword = 'hashedPassword';
      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);

      const result = await passwordService.hash(password);

      expect(bcrypt.hash).toHaveBeenCalledWith(password, 10);
      expect(result).toBe(hashedPassword);
    });
  });

  describe('compare', () => {
    it('should compare the password and hashed password', async () => {
      const password = 'testPassword';
      const hashedPassword = 'hashedPassword';
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);

      const result = await passwordService.compare(password, hashedPassword);

      expect(bcrypt.compare).toHaveBeenCalledWith(password, hashedPassword);
      expect(result).toBe(true);
    });
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { TokenService } from './token.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from '../../users/dto/user.dto';
import { UserDocument } from '../../users/entities/user.entity';

describe('TokenService', () => {
  let service: TokenService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TokenService,
        {
          provide: JwtService,
          useValue: {
            sign: jest.fn().mockReturnValue('mockToken'),
            verify: jest.fn().mockReturnValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<TokenService>(TokenService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('generateResponse', () => {
    it('should generate a response with an access token', () => {
      // Use a partial type for UserDocument to only specify the properties needed for the test
      const mockUserDocument: Partial<UserDocument> = {
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
        isAdmin: false,
      };

      const result: UserDto = service.generateResponse(
        mockUserDocument as UserDocument,
      );
      expect(result.access_token).toBe('mockToken');
      expect(result.user).toEqual(mockUserDocument);
    });
  });
});

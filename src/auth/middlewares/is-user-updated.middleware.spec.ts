import { Test } from '@nestjs/testing';
import { IsUserUpdatedMiddleware } from './is-user-updated.middleware';
import { UsersService } from '../../users/users.service';

// Mock the UsersService
jest.mock('../../users/users.service', () => ({
  UsersService: jest.fn().mockImplementation(() => ({
    findById: jest.fn(),
  })),
}));

describe('IsUserUpdatedMiddleware', () => {
  let isUserUpdatedMiddleware: IsUserUpdatedMiddleware;
  let usersService: UsersService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [IsUserUpdatedMiddleware, UsersService],
    }).compile();

    isUserUpdatedMiddleware = moduleRef.get<IsUserUpdatedMiddleware>(
      IsUserUpdatedMiddleware,
    );
    usersService = moduleRef.get<UsersService>(UsersService);
  });

  it('should allow request if user token is up to date', async () => {
    const req: any = {
      user: {
        id: '123',
        iat: 1633029200, // Example timestamp
      },
    };
    const res = {};
    const next = jest.fn();

    const dbUser = {
      updatedAt: new Date(1633029200 * 1000), // Same timestamp as iat
    };

    (usersService.findById as jest.Mock).mockResolvedValue(dbUser);

    await isUserUpdatedMiddleware.use(req, res, next);

    expect(next).toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if user token is not up to date', async () => {
    const req: any = {
      user: {
        id: '123',
        iat: 1633029200, // Example timestamp
      },
    };
    const res = {};
    const next = jest.fn();

    const dbUser = {
      updatedAt: new Date((1633029200 + 1) * 1000), // Updated timestamp is greater than iat
    };

    (usersService.findById as jest.Mock).mockResolvedValue(dbUser);

    await expect(isUserUpdatedMiddleware.use(req, res, next)).rejects.toThrow(
      'you need to refresh the token',
    );
  });
});

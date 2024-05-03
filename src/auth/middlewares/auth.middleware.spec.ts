import { Test } from '@nestjs/testing';
import { AuthMiddleware } from './auth.middleware';
import { TokenService } from '../services/token.service';
jest.mock('../services/token.service', () => ({
  TokenService: jest.fn().mockImplementation(() => ({
    verify: jest.fn(),
  })),
}));

describe('AuthMiddleware', () => {
  let authMiddleware: AuthMiddleware;
  let tokenService: TokenService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthMiddleware, TokenService],
    }).compile();

    authMiddleware = moduleRef.get<AuthMiddleware>(AuthMiddleware);
    tokenService = moduleRef.get<TokenService>(TokenService);
  });

  it('should extract token from Authorization header', async () => {
    const req: any = {
      headers: {
        authorization: 'Bearer testToken',
      },
    };
    const res = {};
    const next = jest.fn();

    (tokenService.verify as jest.Mock).mockResolvedValue({ id: '123' });

    await authMiddleware.use(req, res, next);

    expect(req.user).toEqual({ id: '123' });
    expect(next).toHaveBeenCalled();
  });

  it('should extract token from cookies', async () => {
    const req: any = {
      headers: {},
      cookies: {
        access_token: 'testToken',
      },
    };
    const res = {};
    const next = jest.fn();

    (tokenService.verify as jest.Mock).mockResolvedValue({ id: '123' });

    await authMiddleware.use(req, res, next);

    expect(req.user).toEqual({ id: '123' });
    expect(next).toHaveBeenCalled();
  });

  it('should throw UnauthorizedException if no token is provided', async () => {
    const req = {
      headers: {},
      cookies: {},
    };
    const res = {};
    const next = jest.fn();

    await expect(authMiddleware.use(req, res, next)).rejects.toThrow(
      'Token is required',
    );
  });
});

import { Test } from '@nestjs/testing';
import { IsAdminGuard } from './is-admin.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';

jest.mock('@nestjs/core', () => ({
  ...jest.requireActual('@nestjs/core'),
  Reflector: jest.fn().mockImplementation(() => ({
    get: jest.fn(),
  })),
}));

describe('IsAdminGuard', () => {
  let isAdminGuard: IsAdminGuard;
  let reflector: Reflector;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [IsAdminGuard, Reflector],
    }).compile();

    isAdminGuard = moduleRef.get<IsAdminGuard>(IsAdminGuard);
    reflector = moduleRef.get<Reflector>(Reflector);
  });

  it('should return true if route is public', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            isAdmin: true,
          },
        }),
      }),
      getHandler: () => ({}),
    } as unknown as ExecutionContext;

    (reflector.get as jest.Mock).mockReturnValue(true);

    expect(isAdminGuard.canActivate(context)).toBe(true);
  });

  it('should return true if user is admin', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            isAdmin: true,
          },
        }),
      }),
      getHandler: () => ({}),
    } as unknown as ExecutionContext;

    (reflector.get as jest.Mock).mockReturnValue(false);

    expect(isAdminGuard.canActivate(context)).toBe(true);
  });

  it('should return false if user is not admin', () => {
    const context = {
      switchToHttp: () => ({
        getRequest: () => ({
          user: {
            isAdmin: false,
          },
        }),
      }),
      getHandler: () => ({}),
    } as unknown as ExecutionContext;

    (reflector.get as jest.Mock).mockReturnValue(false);

    expect(isAdminGuard.canActivate(context)).toBe(false);
  });
});

import { ConfigService } from '@nestjs/config';

export function createJwtModuleConfig(configService: ConfigService) {
  return {
    secret: configService.get<string>('JWT_SECRET_KEY'),
    signOptions: {
      expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
    },
  };
}

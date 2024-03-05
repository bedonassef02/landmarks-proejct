import { ConfigService } from '@nestjs/config';
import {
  JWT_EXPIRES_IN,
  JWT_SECRET_KEY,
} from '../../utils/constants/constants';

export function createJwtModuleConfig(configService: ConfigService) {
  return {
    secret: configService.get<string>(JWT_SECRET_KEY),
    signOptions: {
      expiresIn: configService.get<string>(JWT_EXPIRES_IN),
    },
  };
}

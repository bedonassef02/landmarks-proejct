import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { createJwtModuleConfig } from './create-jwt-module-config';
import { DynamicModule } from '@nestjs/common';

export const jwtModule: DynamicModule = JwtModule.registerAsync({
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: createJwtModuleConfig,
});

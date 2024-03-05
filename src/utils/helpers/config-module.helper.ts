import { ConfigModule } from '@nestjs/config';
import { dotenvValidator } from '../validators/dotenv.validator';
import { DynamicModule } from '@nestjs/common';

export const configModule: DynamicModule = ConfigModule.forRoot({
  isGlobal: true,
  expandVariables: true,
  validationSchema: dotenvValidator,
});

import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PasswordService } from './services/pasword.service';
import { TokenService } from './services/token.service';
import { jwtModule } from './helpers/jwt-module.helper';
import { ProfileController } from './contollers/profile.controller';
import { cookieProvider } from './helpers/cookie-provider.helper';
import { ProfileService } from './services/profile.service';

@Module({
  imports: [jwtModule, UsersModule],
  controllers: [AuthController, ProfileController],
  providers: [
    AuthService,
    PasswordService,
    TokenService,
    cookieProvider,
    ProfileService,
  ],
})
export class AuthModule {}

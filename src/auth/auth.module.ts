import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PasswordService } from './services/password.service';
import { TokenService } from './services/token.service';
import { jwtModule } from './utils/helpers/jwt-module.helper';
import { ProfileController } from './contollers/profile.controller';
import { ProfileService } from './services/profile.service';
import { AuthMiddleware } from './middlewares/auth.middleware';

@Module({
  imports: [jwtModule, UsersModule],
  controllers: [AuthController, ProfileController],
  providers: [AuthService, PasswordService, TokenService, ProfileService],
  exports: [TokenService],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AuthMiddleware).forRoutes(ProfileController);
  }
}

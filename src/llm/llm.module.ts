import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LlmService } from './llm.service';
import { LlmController } from './llm.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Llm, LlmSchema } from './entities/llm.entity';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { IsUserUpdatedMiddleware } from '../auth/middlewares/is-user-updated.middleware';
import { AuthModule } from '../auth/auth.module';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    MongooseModule.forFeature([{ name: Llm.name, schema: LlmSchema }]),
  ],
  controllers: [LlmController],
  providers: [LlmService],
})
export class LlmModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware, IsUserUpdatedMiddleware)
      .exclude({
        path: '/llm',
        method: RequestMethod.GET,
        version: '1',
      })
      .forRoutes(LlmController);
  }
}

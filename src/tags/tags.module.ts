import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { TagsController } from './tags.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Tag, TagSchema } from './entities/tag.entity';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    AuthModule,
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    CacheModule.register(),
  ],
  controllers: [TagsController],
  providers: [TagsService],
  exports: [TagsService],
})
export class TagsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/tags',
          method: RequestMethod.GET,
          version: '1',
        },
        {
          path: '/tags/:id',
          method: RequestMethod.GET,
          version: '1',
        },
      )
      .forRoutes(TagsController);
  }
}

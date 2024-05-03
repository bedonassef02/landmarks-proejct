import { Module } from '@nestjs/common';
import { LandmarksModule } from './landmarks/landmarks.module';
import { CitiesModule } from './cities/cities.module';
import { TagsModule } from './tags/tags.module';
import { DatabaseModule } from './database/database.module';
import { IsUniqueConstraint } from './utils/constraints/is-unique.constaint';
import { IsExistConstraint } from './utils/constraints/is-exist.constaint';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { configModule } from './utils/helpers/config-module.helper';
import { LikesModule } from './likes/likes.module';
import { ReviewsModule } from './reviews/reviews.module';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { LlmModule } from './llm/llm.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    configModule,
    LandmarksModule,
    CitiesModule,
    TagsModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    LikesModule,
    ReviewsModule,
    EventEmitterModule.forRoot(),
    LlmModule,
    CacheModule.register({
      max: 10,
      ttl: 60000,
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [IsUniqueConstraint, IsExistConstraint],
})
export class AppModule {
}

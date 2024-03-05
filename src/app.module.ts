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
import { serveStaticModule } from './utils/helpers/serve-static-module.helper';
import { LikesModule } from './likes/likes.module';
import { ReviewsModule } from './reviews/reviews.module';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    configModule,
    serveStaticModule,
    LandmarksModule,
    CitiesModule,
    TagsModule,
    DatabaseModule,
    AuthModule,
    UsersModule,
    LikesModule,
    ReviewsModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [],
  providers: [IsUniqueConstraint, IsExistConstraint],
})
export class AppModule {}

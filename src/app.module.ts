import { Module } from '@nestjs/common';
import { LandmarksModule } from './landmarks/landmarks.module';
import { CitiesModule } from './cities/cities.module';
import { TagsModule } from './tags/tags.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    LandmarksModule,
    CitiesModule,
    TagsModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

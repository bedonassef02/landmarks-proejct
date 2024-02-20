import { Module } from '@nestjs/common';
import { LandmarksModule } from './landmarks/landmarks.module';
import { CitiesModule } from './cities/cities.module';
import { TagsModule } from './tags/tags.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import { IsUniqueConstraint } from './utils/constraints/is-unique.constaint';
import { IsExistConstraint } from './utils/constraints/is-exist.constaint';
import { join } from 'path';
import { ServeStaticModule } from '@nestjs/serve-static';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads'),
    }),
    LandmarksModule,
    CitiesModule,
    TagsModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [IsUniqueConstraint, IsExistConstraint],
})
export class AppModule {}

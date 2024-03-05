import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { LandmarksService } from './landmarks.service';
import { LandmarksController } from './landmarks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from './entities/location.entity';
import { Landmark, LandmarkSchema } from './entities/landmark.entity';
import { Image, ImageSchema } from './entities/image.entity';
import { LocationService } from './services/location.service';
import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { AuthModule } from '../auth/auth.module';
import { multerModule } from '../users/utils/helpers/multer-module.helper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
      { name: Landmark.name, schema: LandmarkSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    multerModule,
    AuthModule,
  ],
  controllers: [LandmarksController],
  providers: [LandmarksService, LocationService],
  exports: [LandmarksService],
})
export class LandmarksModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        {
          path: '/landmarks',
          method: RequestMethod.GET,
          version: '1',
        },
        {
          path: '/landmarks/:id',
          method: RequestMethod.GET,
          version: '1',
        },
      )
      .forRoutes(LandmarksController);
  }
}

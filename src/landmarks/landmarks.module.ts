import { Module } from '@nestjs/common';
import { LandmarksService } from './landmarks.service';
import { LandmarksController } from './landmarks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Location, LocationSchema } from './entities/location.entity';
import { Landmark, LandmarkSchema } from './entities/landmark.entity';
import { Image, ImageSchema } from './entities/image.entity';
import { LocationService } from './services/location.service';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { uploadFileName } from '../utils/helpers/filename.helper';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Location.name, schema: LocationSchema },
      { name: Landmark.name, schema: LandmarkSchema },
      { name: Image.name, schema: ImageSchema },
    ]),
    MulterModule.register({
      dest: './uploads',
      storage: diskStorage({
        destination: './uploads',
        filename: uploadFileName,
      }),
    }),
  ],
  controllers: [LandmarksController],
  providers: [LandmarksService, LocationService],
  exports: [LandmarksService],
})
export class LandmarksModule {}

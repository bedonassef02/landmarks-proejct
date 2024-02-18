import { Module } from '@nestjs/common';
import { LandmarksService } from './landmarks.service';
import { LandmarksController } from './landmarks.controller';

@Module({
  controllers: [LandmarksController],
  providers: [LandmarksService],
})
export class LandmarksModule {}

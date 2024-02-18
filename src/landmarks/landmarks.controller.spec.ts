import { Test, TestingModule } from '@nestjs/testing';
import { LandmarksController } from './landmarks.controller';
import { LandmarksService } from './landmarks.service';

describe('LandmarksController', () => {
  let controller: LandmarksController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LandmarksController],
      providers: [LandmarksService],
    }).compile();

    controller = module.get<LandmarksController>(LandmarksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

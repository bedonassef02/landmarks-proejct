import { Test, TestingModule } from '@nestjs/testing';
import { LandmarksService } from './landmarks.service';

describe('LandmarksService', () => {
  let service: LandmarksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LandmarksService],
    }).compile();

    service = module.get<LandmarksService>(LandmarksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

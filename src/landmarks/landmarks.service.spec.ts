import { LandmarksService } from './landmarks.service';
import { Landmark } from './entities/landmark.entity';
import { LocationService } from './services/location.service';
import { Model } from 'mongoose';

describe('LandmarksService', () => {
  let service: LandmarksService;
  let mockLandmarkModel: Model<Landmark>;
  let locationService: LocationService;
});

import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from '../entities/location.entity';
import { LocationService } from './location.service';
import { CreateLocationDto } from '../dto/create-location.dto';

describe('LocationService', () => {
  let service: LocationService;
  let locationModel: Model<LocationDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LocationService,
        {
          provide: getModelToken(Location.name),
          useValue: {
            create: jest.fn().mockResolvedValue({}),
          },
        },
      ],
    }).compile();

    service = module.get<LocationService>(LocationService);
    locationModel = module.get<Model<LocationDocument>>(
      getModelToken(Location.name),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a location', async () => {
    const locationDto: CreateLocationDto = {
      name: 'location1',
      latitude: 1,
      longitude: 50,
    };
    jest
      .spyOn(locationModel, 'create')
      .mockResolvedValueOnce(locationDto as any);
    expect(await service.create(locationDto)).toEqual(locationDto);
  });
});

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Location, LocationDocument } from '../entities/location.entity';
import { CreateLocationDto } from '../dto/create-location.dto';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: Model<LocationDocument>,
  ) {}

  async create(
    createLocationDto: CreateLocationDto,
  ): Promise<LocationDocument> {
    return this.locationModel.create(createLocationDto);
  }
}

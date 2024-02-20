import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateLandmarkDto } from './dto/create-landmark.dto';
import { UpdateLandmarkDto } from './dto/update-landmark.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Landmark, LandmarkDocument } from './entities/landmark.entity';
import { Model } from 'mongoose';
import { LocationService } from './services/location.service';

@Injectable()
export class LandmarksService {
  constructor(
    @InjectModel(Landmark.name)
    private readonly landmarkModel: Model<LandmarkDocument>,
    private readonly locationService: LocationService,
  ) {}

  async create(
    createLandmarkDto: CreateLandmarkDto,
  ): Promise<LandmarkDocument> {
    createLandmarkDto.location = await this.locationService.create(
      createLandmarkDto.location,
    );
    return this.landmarkModel.create(createLandmarkDto);
  }

  findAll(): Promise<LandmarkDocument[]> {
    return this.landmarkModel.find({});
  }

  async findOne(id: string): Promise<LandmarkDocument> {
    const landmark: LandmarkDocument | undefined =
      await this.landmarkModel.findById(id);
    if (!landmark) {
      throw new NotFoundException('landmark not found');
    }
    return landmark;
  }

  findByName(name: string): Promise<LandmarkDocument | undefined> {
    return this.landmarkModel.findOne({ name });
  }

  async update(
    id: string,
    updateLandmarkDto: UpdateLandmarkDto,
  ): Promise<LandmarkDocument> {
    const landmark: LandmarkDocument | undefined =
      await this.landmarkModel.findById(id);

    if (!landmark) {
      throw new NotFoundException('Landmark id not found');
    }

    const existingLandmark: LandmarkDocument = await this.landmarkModel
      .findOne({
        name: updateLandmarkDto.name,
        _id: { $ne: id },
      })
      .exec();

    if (existingLandmark) {
      throw new ConflictException('Landmark name is already in use');
    }
    return this.landmarkModel.findByIdAndUpdate(id, updateLandmarkDto, {
      new: true,
    });
  }

  async remove(id: string): Promise<void> {
    await this.landmarkModel.findByIdAndDelete(id);
  }
}

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
import { LandmarksQueryFeature } from './utils/features/landmarks-query.feature';
import { paginationDetails } from '../utils/helpers/pagination-details.helper';
import { PaginationResponseFeature } from '../utils/features/pagination-response.feature';
import { OnEvent } from '@nestjs/event-emitter';
import { IncrementLikesDto } from '../likes/dto/increment-likes.dto';

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

  async findAll(
    query: LandmarksQueryFeature,
  ): Promise<PaginationResponseFeature> {
    const filter = this.filter(query);
    const landmarks: LandmarkDocument[] = await this.landmarkModel
      .find(filter)
      .select(query.fields)
      .limit(query.limit)
      .skip(query.skip)
      .sort(query.sort);
    const totalItems: number = await this.totalItems(filter);
    return paginationDetails(query, landmarks, totalItems);
  }

  async findOne(id: string): Promise<LandmarkDocument> {
    const landmark: LandmarkDocument | null = await this.landmarkModel
      .findById(id)
      .populate('location')
      .populate({ path: 'tags', select: 'name' })
      .populate({ path: 'city', select: 'name' });

    if (!landmark) {
      throw new NotFoundException('Landmark not found');
    }

    landmark.views = landmark.views + 1 || 0;
    await landmark.save();
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

  private filter(query: LandmarksQueryFeature): any {
    const filter: any = {
      $or: query.searchQuery,
    };

    if (query.is_recommended) {
      filter.is_recommended = true;
    }

    if (query.cities) {
      const citiesArray = query.cities.split(',').map((tag) => tag.trim());
      filter.city = { $in: citiesArray };
    }

    if (query.tags) {
      // filter.tags = query.tags;
      const tagsArray = query.tags.split(',').map((tag) => tag.trim());
      filter.tags = { $in: tagsArray };
    }

    return filter;
  }

  private async totalItems(searchQuery: any): Promise<number> {
    return this.landmarkModel.countDocuments(searchQuery);
  }

  @OnEvent('likes.increment')
  async incrementLikes(incrementLikesDto: IncrementLikesDto): Promise<void> {
    const landmark: LandmarkDocument = await this.findOne(incrementLikesDto.id);
    const likes_count: number = landmark.likes_count + incrementLikesDto.val;
    await this.update(incrementLikesDto.id, { likes_count });
  }
}

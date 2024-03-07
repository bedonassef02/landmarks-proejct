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
import { Image, ImageDocument } from './entities/image.entity';
import * as mongoose from 'mongoose';
import { OnEvent } from '@nestjs/event-emitter';
import { IncrementLikesDto } from '../likes/dto/increment-likes.dto';

@Injectable()
export class LandmarksService {
  constructor(
    @InjectModel(Landmark.name)
    private readonly landmarkModel: Model<LandmarkDocument>,
    @InjectModel(Image.name)
    private readonly imageModel: Model<ImageDocument>,
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

  async updateImages(id: string, images: string[]): Promise<void> {
    // Create new image documents and collect their IDs
    const createdImageIds: mongoose.Types.ObjectId[] = [];
    for (const image of images) {
      const createdImage = await this.imageModel.create({ path: image });
      createdImageIds.push(createdImage._id);
    }

    // Update the landmark with the new image IDs
    await this.landmarkModel.findByIdAndUpdate(
      id,
      { images: createdImageIds },
      { new: true },
    );
  }

  async remove(id: string): Promise<void> {
    await this.landmarkModel.findByIdAndDelete(id);
  }

  private filter(query: LandmarksQueryFeature): any {
    const filter: any = {
      $or: query.searchQuery,
    };

    if (query.city) {
      filter.city = query.city;
    }

    if (query.tag) {
      filter.tags = query.tag;
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

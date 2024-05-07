import { Inject, Injectable } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Like, LikeDocument } from './entities/like.entity';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IncrementLikesDto } from './dto/increment-likes.dto';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { Landmark } from '../landmarks/entities/landmark.entity';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private readonly likeModel: Model<LikeDocument>,
    private eventEmitter: EventEmitter2,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async like(likeDto: LikeDto): Promise<LikeDocument | undefined> {
    const like: LikeDocument | undefined = await this.findOne(likeDto);
    const incrementLikesDto: IncrementLikesDto = {
      id: likeDto.landmark,
      val: 1,
    };
    if (!like) {
      this.incrementLikes(incrementLikesDto);
      return this.likeModel.create(likeDto);
    }
    this.incrementLikes({ ...incrementLikesDto, val: -1 });
    await this.likeModel.findByIdAndDelete(like.id);
  }

  async findAll(user: string): Promise<any> {
    const cacheKey: string = `likes:${user}`;
    const isCached = await this.cacheManager.get(cacheKey);
    if (isCached) {
      return isCached;
    }
    const likes = await this.likeModel.find({ user }, { landmark: 1, _id: 0 });
    const data: Landmark[] = likes.flatMap((like) => like.landmark);
    await this.cacheManager.set(cacheKey, data);
    return data;
  }

  findOne(likeDto: LikeDto): Promise<LikeDocument | undefined> {
    return this.likeModel.findOne(likeDto);
  }

  private incrementLikes(incrementLikesDto: IncrementLikesDto) {
    this.eventEmitter.emit('likes.increment', incrementLikesDto);
  }
}

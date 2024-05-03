import { Injectable } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Like, LikeDocument } from './entities/like.entity';
import { Model } from 'mongoose';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { IncrementLikesDto } from './dto/increment-likes.dto';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private readonly likeModel: Model<LikeDocument>,
    private eventEmitter: EventEmitter2,
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
    const likes = await this.likeModel.find({ user }, { landmark: 1, _id: 0 });
    return likes.flatMap((like) => like.landmark);
  }

  findOne(likeDto: LikeDto): Promise<LikeDocument | undefined> {
    return this.likeModel.findOne(likeDto);
  }

  private incrementLikes(incrementLikesDto: IncrementLikesDto) {
    this.eventEmitter.emit('likes.increment', incrementLikesDto);
  }
}

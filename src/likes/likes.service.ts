import { Injectable } from '@nestjs/common';
import { LikeDto } from './dto/like.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Like, LikeDocument } from './entities/like.entity';
import { Model } from 'mongoose';

@Injectable()
export class LikesService {
  constructor(
    @InjectModel(Like.name) private readonly likeModel: Model<LikeDocument>,
  ) {}
  async like(likeDto: LikeDto): Promise<LikeDocument | undefined> {
    const like: LikeDocument | undefined = await this.findOne(likeDto);
    if (!like) {
      return this.likeModel.create(likeDto);
    }
    await this.likeModel.findByIdAndDelete(like.id);
  }

  findAll(user: string) {
    return this.likeModel.find({ user });
  }

  async findOne(likeDto: LikeDto): Promise<LikeDocument | undefined> {
    return this.likeModel.findOne(likeDto);
  }
}

import { Injectable } from '@nestjs/common';
import { CreateReviewDto } from './dto/create-review.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Review, ReviewDocument } from './entities/review.entity';
import { Model } from 'mongoose';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<ReviewDocument>,
  ) {}
  create(createReviewDto: CreateReviewDto): Promise<ReviewDocument> {
    return this.reviewModel.create(createReviewDto);
  }

  findAll(landmark: string): Promise<ReviewDocument[]> {
    return this.reviewModel.find({ landmark });
  }
}

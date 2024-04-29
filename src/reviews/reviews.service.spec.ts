import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { ReviewsService } from './reviews.service';
import { Review, ReviewDocument } from './entities/review.entity';
import { Model } from 'mongoose';
import { CreateReviewDto } from './dto/create-review.dto';

describe('ReviewsService', () => {
  let service: ReviewsService;
  let reviewModel: Model<ReviewDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReviewsService,
        {
          provide: getModelToken(Review.name),
          useValue: {
            create: jest.fn().mockResolvedValue({}),
            find: jest.fn().mockResolvedValue([]),
          },
        },
      ],
    }).compile();

    service = module.get<ReviewsService>(ReviewsService);
    reviewModel = module.get<Model<ReviewDocument>>(getModelToken(Review.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a review', async () => {
    const createReviewDto: CreateReviewDto = {
      landmark: 'review1',
      stars: 5,
      message: 'test',
      user: '',
    };
    jest
      .spyOn(reviewModel, 'create')
      .mockResolvedValueOnce(createReviewDto as any);
    expect(await service.create(createReviewDto)).toEqual(createReviewDto);
  });

  it('should find all reviews for a landmark', async () => {
    const landmark = 'landmark1';
    const reviews = [{ title: 'review1', content: 'content1', landmark }];
    jest.spyOn(reviewModel, 'find').mockResolvedValueOnce(reviews as any);
    expect(await service.findAll(landmark)).toEqual(reviews);
  });
});

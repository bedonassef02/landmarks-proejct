import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { User } from '../users/utils/decorators/user.decorator';
import { ReviewDocument } from './entities/review.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Reviews')
@Controller({ path: 'reviews', version: '1' })
export class ReviewsController {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Post()
  create(
    @User('id') user: string,
    @Body() createReviewDto: CreateReviewDto,
  ): Promise<ReviewDocument> {
    createReviewDto.user = user;
    return this.reviewsService.create(createReviewDto);
  }

  @Get(':id')
  findAll(@Param('id') id: string): Promise<ReviewDocument[]> {
    return this.reviewsService.findAll(id);
  }
}

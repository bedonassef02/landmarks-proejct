import { Body, Controller, Get, Param, Patch } from '@nestjs/common';
import { LikesService } from './likes.service';
import { LikeDto } from './dto/like.dto';
import { User } from '../users/utils/decorators/user.decorator';
import { LikeDocument } from './entities/like.entity';
import { ParseMongoIdPipe } from '../utils/pipes/parse-mongo-id.pipe';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Likes')
@Controller({ path: 'likes', version: '1' })
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @Patch()
  like(
    @Body() likeDto: LikeDto,
    @User('id') user: string,
  ): Promise<LikeDocument | undefined> {
    likeDto.user = user;
    return this.likesService.like(likeDto);
  }

  @Get()
  findAll(@User('id') id: string): Promise<LikeDocument[]> {
    return this.likesService.findAll(id);
  }

  @Get(':id')
  findOne(
    @User('id') user: string,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<LikeDocument | undefined> {
    return this.likesService.findOne({ user, landmark: id });
  }
}

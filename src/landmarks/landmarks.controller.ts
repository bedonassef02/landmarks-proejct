import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { LandmarksService } from './landmarks.service';
import { CreateLandmarkDto } from './dto/create-landmark.dto';
import { UpdateLandmarkDto } from './dto/update-landmark.dto';
import { LandmarkDocument } from './entities/landmark.entity';
import { LandmarksQueryFeature } from './utils/features/landmarks-query.feature';
import { PaginationResponseFeature } from '../utils/features/pagination-response.feature';
import { ParseMongoIdPipe } from '../utils/pipes/parse-mongo-id.pipe';
import { Public } from '../auth/utils/decorators/public.decorator';
import { IsAdminGuard } from '../auth/guards/is-admin.guard';

@Controller({ path: 'landmarks', version: '1' })
export class LandmarksController {
  constructor(private readonly landmarksService: LandmarksService) {}

  @Post()
  @UseGuards(IsAdminGuard)
  async create(
    @Body() createLandmarkDto: CreateLandmarkDto,
  ): Promise<LandmarkDocument> {
    return this.landmarksService.create(createLandmarkDto);
  }

  @Get()
  @Public()
  findAll(
    @Query() query: LandmarksQueryFeature,
  ): Promise<PaginationResponseFeature> {
    return this.landmarksService.findAll(query);
  }

  @Get(':id')
  @Public()
  @UsePipes(ParseMongoIdPipe)
  findOne(@Param('id') id: string): Promise<LandmarkDocument> {
    return this.landmarksService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(IsAdminGuard)
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateLandmarkDto: UpdateLandmarkDto,
  ): Promise<LandmarkDocument> {
    return this.landmarksService.update(id, updateLandmarkDto);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  @UsePipes(ParseMongoIdPipe)
  async remove(@Param('id') id: string): Promise<void> {
    await this.landmarksService.remove(id);
  }
}

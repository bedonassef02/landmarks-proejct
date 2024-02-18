import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LandmarksService } from './landmarks.service';
import { CreateLandmarkDto } from './dto/create-landmark.dto';
import { UpdateLandmarkDto } from './dto/update-landmark.dto';

@Controller('landmarks')
export class LandmarksController {
  constructor(private readonly landmarksService: LandmarksService) {}

  @Post()
  create(@Body() createLandmarkDto: CreateLandmarkDto) {
    return this.landmarksService.create(createLandmarkDto);
  }

  @Get()
  findAll() {
    return this.landmarksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.landmarksService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLandmarkDto: UpdateLandmarkDto,
  ) {
    return this.landmarksService.update(+id, updateLandmarkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.landmarksService.remove(+id);
  }
}

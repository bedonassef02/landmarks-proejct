import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
  HttpStatus,
  ParseFilePipe,
} from '@nestjs/common';
import { LandmarksService } from './landmarks.service';
import { CreateLandmarkDto } from './dto/create-landmark.dto';
import { UpdateLandmarkDto } from './dto/update-landmark.dto';
import { LandmarkDocument } from './entities/landmark.entity';
import { FileInterceptor } from '@nestjs/platform-express';
import { imageTypeValidation } from '../utils/validators/image-type.validation';

@Controller('landmarks')
export class LandmarksController {
  constructor(private readonly landmarksService: LandmarksService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async create(
    @Body() createLandmarkDto: CreateLandmarkDto,
    @UploadedFile(new ParseFilePipe(imageTypeValidation()))
    image: Express.Multer.File,
  ): Promise<LandmarkDocument> {
    createLandmarkDto.cover_image = image.filename;
    return this.landmarksService.create(createLandmarkDto);
  }

  @Get()
  findAll(): Promise<LandmarkDocument[]> {
    return this.landmarksService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<LandmarkDocument> {
    return this.landmarksService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLandmarkDto: UpdateLandmarkDto,
  ): Promise<LandmarkDocument> {
    return this.landmarksService.update(id, updateLandmarkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.landmarksService.remove(id);
  }
}

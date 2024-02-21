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
  ParseFilePipe,
  Query,
  UsePipes,
  UploadedFiles,
} from '@nestjs/common';
import { LandmarksService } from './landmarks.service';
import { CreateLandmarkDto } from './dto/create-landmark.dto';
import { UpdateLandmarkDto } from './dto/update-landmark.dto';
import { LandmarkDocument } from './entities/landmark.entity';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { imageTypeValidation } from '../utils/validators/image-type.validation';
import { LandmarksQueryFeature } from './utils/features/landmarks-query.feature';
import { PaginationResponseFeature } from '../utils/features/pagination-response.feature';
import { ParseMongoIdPipe } from '../utils/pipes/parse-mongo-id.pipe';

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

  @Patch(':id/images')
  @UseInterceptors(FilesInterceptor('images'))
  async createImages(
    @UploadedFiles(new ParseFilePipe(imageTypeValidation()))
    images: Array<Express.Multer.File>,
    @Param('id', ParseMongoIdPipe) id: string,
  ): Promise<void> {
    await this.landmarksService.updateImages(
      id,
      images.map((image) => image.filename),
    );
  }

  @Get()
  findAll(
    @Query() query: LandmarksQueryFeature,
  ): Promise<PaginationResponseFeature> {
    return this.landmarksService.findAll(query);
  }

  @Get(':id')
  @UsePipes(ParseMongoIdPipe)
  findOne(@Param('id') id: string): Promise<LandmarkDocument> {
    return this.landmarksService.findOne(id);
  }
  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateLandmarkDto: UpdateLandmarkDto,
  ): Promise<LandmarkDocument> {
    return this.landmarksService.update(id, updateLandmarkDto);
  }

  @Patch(':id/cover_image')
  @UseInterceptors(FileInterceptor('image'))
  updateCoverImage(
    @UploadedFile(new ParseFilePipe(imageTypeValidation()))
    image: Express.Multer.File,
    @Param('id', ParseMongoIdPipe) id: string,
  ) {
    const cover_image: string = image.filename;
    return this.update(id, { cover_image });
  }
  @Delete(':id')
  @UsePipes(ParseMongoIdPipe)
  async remove(@Param('id') id: string): Promise<void> {
    await this.landmarksService.remove(id);
  }
}

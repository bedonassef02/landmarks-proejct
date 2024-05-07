import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagDocument } from './entities/tag.entity';
import { ParseMongoIdPipe } from '../utils/pipes/parse-mongo-id.pipe';
import { IsAdminGuard } from '../auth/guards/is-admin.guard';
import { Public } from '../auth/utils/decorators/public.decorator';
import { CacheInterceptor, CacheKey, CacheTTL } from '@nestjs/cache-manager';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tags')
@Controller({ path: 'tags', version: '1' })
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  @UseGuards(IsAdminGuard)
  create(@Body() createTagDto: CreateTagDto): Promise<TagDocument> {
    return this.tagsService.create(createTagDto);
  }

  @Get()
  @Public()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('tags')
  @CacheTTL(60000 * 10)
  findAll(): Promise<TagDocument[]> {
    return this.tagsService.findAll();
  }

  @Get(':id')
  @Public()
  @UsePipes(ParseMongoIdPipe)
  findOne(@Param('id') id: string): Promise<TagDocument> {
    return this.tagsService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(IsAdminGuard)
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateTagDto: UpdateTagDto,
  ): Promise<TagDocument> {
    return this.tagsService.update(id, updateTagDto);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  @UsePipes(ParseMongoIdPipe)
  async remove(@Param('id') id: string): Promise<void> {
    await this.tagsService.remove(id);
  }
}

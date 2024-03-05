import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes, UseGuards,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityDocument } from './entities/city.entity';
import { ParseMongoIdPipe } from '../utils/pipes/parse-mongo-id.pipe';
import { IsAdminGuard } from '../auth/guards/is-admin.guard';
import { Public } from '../auth/utils/decorators/public.decorator';

@Controller({ path: 'cities', version: '1' })
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  @UseGuards(IsAdminGuard)
  create(@Body() createCityDto: CreateCityDto): Promise<CityDocument> {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  @Public()
  findAll(): Promise<CityDocument[]> {
    return this.citiesService.findAll();
  }

  @Get(':id')
  @Public()
  @UsePipes(ParseMongoIdPipe)
  findOne(@Param('id') id: string): Promise<CityDocument> {
    return this.citiesService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(IsAdminGuard)
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<CityDocument> {
    return this.citiesService.update(id, updateCityDto);
  }

  @Delete(':id')
  @UseGuards(IsAdminGuard)
  @UsePipes(ParseMongoIdPipe)
  async remove(@Param('id') id: string): Promise<void> {
    await this.citiesService.remove(id);
  }
}

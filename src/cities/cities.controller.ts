import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete, UsePipes,
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { CityDocument } from './entities/city.entity';
import { ParseMongoIdPipe } from '../utils/pipes/parse-mongo-id.pipe';

@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @Post()
  create(@Body() createCityDto: CreateCityDto): Promise<CityDocument> {
    return this.citiesService.create(createCityDto);
  }

  @Get()
  findAll(): Promise<CityDocument[]> {
    return this.citiesService.findAll();
  }

  @Get(':id')
  @UsePipes(ParseMongoIdPipe)
  findOne(@Param('id') id: string): Promise<CityDocument> {
    return this.citiesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<CityDocument> {
    return this.citiesService.update(id, updateCityDto);
  }

  @Delete(':id')
  @UsePipes(ParseMongoIdPipe)
  async remove(@Param('id') id: string): Promise<void> {
    await this.citiesService.remove(id);
  }
}

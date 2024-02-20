import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCityDto } from './dto/create-city.dto';
import { UpdateCityDto } from './dto/update-city.dto';
import { InjectModel } from '@nestjs/mongoose';
import { City, CityDocument } from './entities/city.entity';
import { Model } from 'mongoose';

@Injectable()
export class CitiesService {
  constructor(
    @InjectModel(City.name) private readonly cityModel: Model<CityDocument>,
  ) {}

  async create(createCityDto: CreateCityDto): Promise<CityDocument> {
    return this.cityModel.create(createCityDto);
  }

  findAll(): Promise<CityDocument[]> {
    return this.cityModel.find({});
  }

  async findOne(id: string): Promise<CityDocument> {
    const city: CityDocument | undefined = await this.cityModel.findById(id);
    if (!city) {
      throw new NotFoundException('city id not found');
    }
    return city;
  }

  findByName(name: string): Promise<CityDocument> {
    return this.cityModel.findOne({ name });
  }

  async update(
    id: string,
    updateCityDto: UpdateCityDto,
  ): Promise<CityDocument> {
    // Find the city by its ID
    const city: CityDocument | undefined = await this.cityModel
      .findById(id)
      .exec();

    // If the city does not exist, throw NotFoundException
    if (!city) {
      throw new NotFoundException('City id not found');
    }

    // Check if a city with the updated name already exists
    const existingCity: CityDocument = await this.cityModel
      .findOne({
        name: updateCityDto.name,
        _id: { $ne: id },
      })
      .exec();

    if (existingCity) {
      throw new ConflictException('City name is already in use');
    }

    // Update the city and return the updated document
    return this.cityModel.findByIdAndUpdate(id, updateCityDto, { new: true });
  }

  async remove(id: string): Promise<void> {
    await this.cityModel.findByIdAndDelete(id);
  }
}

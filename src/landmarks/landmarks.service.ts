import { Injectable } from '@nestjs/common';
import { CreateLandmarkDto } from './dto/create-landmark.dto';
import { UpdateLandmarkDto } from './dto/update-landmark.dto';

@Injectable()
export class LandmarksService {
  create(createLandmarkDto: CreateLandmarkDto) {
    return 'This action adds a new landmark';
  }

  findAll() {
    return `This action returns all landmarks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} landmark`;
  }

  update(id: number, updateLandmarkDto: UpdateLandmarkDto) {
    return `This action updates a #${id} landmark`;
  }

  remove(id: number) {
    return `This action removes a #${id} landmark`;
  }
}

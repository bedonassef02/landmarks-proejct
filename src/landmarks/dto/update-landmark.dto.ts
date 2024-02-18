import { PartialType } from '@nestjs/mapped-types';
import { CreateLandmarkDto } from './create-landmark.dto';

export class UpdateLandmarkDto extends PartialType(CreateLandmarkDto) {}

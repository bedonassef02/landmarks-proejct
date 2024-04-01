import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateLocationDto } from './create-location.dto';
import { Type } from 'class-transformer';
import { IsUnique } from '../../utils/decorators/is-unique';
import { IsExist } from '../../utils/decorators/is-exist';

export class CreateLandmarkDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 256)
  @IsUnique({ message: 'landmark name is already exist' })
  name: string;
  @IsNotEmpty()
  @IsString()
  @Length(4, 8194)
  description: string;
  @IsNotEmpty()
  @IsString()
  @Length(4, 128)
  era: string;
  @IsNotEmpty()
  @IsString()
  @Length(4, 256)
  famous_figures: string;
  @IsNotEmpty()
  @IsMongoId()
  @IsExist({ message: 'city id does not exist' })
  city: string;
  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  tags: string[];
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  price: number;
  @IsNotEmpty()
  @IsString()
  @Length(0, 512)
  opening_hours: string;
  @IsNotEmpty()
  @IsString()
  cover_image: string;
  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  images: string[];
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  location: CreateLocationDto;
  @IsOptional()
  @IsBoolean()
  is_recommended: boolean = false;
  likes_count?: number;
}

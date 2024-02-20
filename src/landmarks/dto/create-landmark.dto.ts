import {
  ArrayUnique,
  IsArray,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Min,
  ValidateNested,
} from 'class-validator';
import { CreateLocationDto } from './create-location.dto';
import { Transform, Type } from 'class-transformer';
import { IsUnique } from '../../utils/decorators/is-unique';
import { IsExist } from '../../utils/decorators/is-exist';

export class CreateLandmarkDto {
  @IsNotEmpty()
  @IsString()
  @Length(4, 64)
  @IsUnique({ message: 'landmark name is already exist' })
  name: string;
  @IsNotEmpty()
  @IsString()
  @Length(4, 4096)
  description: string;
  @IsNotEmpty()
  @IsString()
  @Length(4, 64)
  era: string;
  @IsNotEmpty()
  @IsString()
  @Length(4, 64)
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
  // @IsNotEmpty()
  // @IsString()
  cover_image: string;
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  location: CreateLocationDto;
}

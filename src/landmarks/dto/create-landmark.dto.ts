import {
  ArrayUnique,
  IsArray,
  IsBoolean,
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { CreateLocationDto } from './create-location.dto';
import { IsUnique } from '../../utils/decorators/is-unique';
import { IsExist } from '../../utils/decorators/is-exist';

export class CreateLandmarkDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Statue of Liberty',
    required: true,
    description: 'The name of the landmark.',
  })
  @IsUnique({ message: 'Landmark name is already in use.' })
  name: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'A symbol of freedom and democracy.',
    required: true,
    description: 'The description of the landmark.',
  })
  description: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '20th century',
    description: 'The era in which the landmark was built.',
  })
  era: string;

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'George Washington',
    description: 'Famous figures associated with the landmark.',
  })
  famous_figures: string;

  @IsNotEmpty()
  @IsMongoId()
  @IsExist({ message: 'City ID does not exist.' })
  @ApiProperty({
    example: '6072d4bda5f1e64e2401df22',
    required: true,
    description: 'The ID of the city where the landmark is located.',
  })
  city: string;

  @IsNotEmpty()
  @IsArray()
  @ArrayUnique()
  @IsMongoId({ each: true })
  @ApiProperty({
    example: ['6072d4bda5f1e64e2401df22', '6072d4bda5f1e64e2401df23'],
    required: true,
    description: 'Tags associated with the landmark (IDs).',
    type: [String],
  })
  tags: string[];

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @ApiProperty({
    example: 100,
    required: true,
    description: 'The price of admission to the landmark.',
  })
  price: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Monday - Friday: 9am - 6pm',
    required: true,
    description: 'The opening hours of the landmark.',
  })
  opening_hours: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'image-url.jpg',
    required: true,
    description: 'The cover image of the landmark.',
  })
  cover_image: string;

  @IsNotEmpty()
  @IsArray()
  @IsString({ each: true })
  @ApiProperty({
    example: ['image-url1.jpg', 'image-url2.jpg'],
    required: true,
    description: 'Images of the landmark.',
    type: [String],
  })
  images: string[];

  @IsNotEmpty()
  @ValidateNested()
  @Type(() => CreateLocationDto)
  @ApiProperty({
    type: CreateLocationDto,
    required: true,
    description: 'The location coordinates of the landmark.',
  })
  location: CreateLocationDto;

  @IsOptional()
  @IsBoolean()
  @ApiProperty({
    example: false,
    description: 'Indicates whether the landmark is recommended.',
  })
  is_recommended: boolean = false;

  likes_count?: number;
}

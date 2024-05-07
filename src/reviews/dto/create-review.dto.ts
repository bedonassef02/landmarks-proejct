import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    example: '6072d4bda5f1e64e2401df22',
    required: true,
    description: 'The ID of the landmark being reviewed.',
  })
  landmark: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  @ApiProperty({
    example: 4,
    required: true,
    description: 'The rating given to the landmark (1-5).',
  })
  stars: number;

  @IsNotEmpty()
  @IsString()
  @Length(4, 128)
  @ApiProperty({
    example: 'This landmark is amazing!',
    required: true,
    description: 'The review message.',
    maxLength: 128,
    minLength: 4,
  })
  message: string;
  user?: string;
}

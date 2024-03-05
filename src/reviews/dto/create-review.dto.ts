import {
  IsMongoId,
  IsNotEmpty,
  IsNumber,
  IsString,
  Length,
  Max,
  Min,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsMongoId()
  landmark: string;
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @Max(5)
  stars: number;
  @IsNotEmpty()
  @IsString()
  @Length(4, 128)
  message: string;
  user?: string;
}

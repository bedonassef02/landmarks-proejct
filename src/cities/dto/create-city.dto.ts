import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @MinLength(3)
  name: string;
}

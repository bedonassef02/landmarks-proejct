import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IsUniqueCity } from '../utils/decorators/is-unique-city';
export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @MinLength(3)
  @IsUniqueCity()
  name: string;
}

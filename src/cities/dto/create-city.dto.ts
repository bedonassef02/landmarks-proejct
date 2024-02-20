import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IsUnique } from '../../utils/decorators/is-unique';
export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @MinLength(3)
  @IsUnique({ message: 'city name is already exist' })
  name: string;
}

import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  latitude: number;
  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  longitude: number;
}

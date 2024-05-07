import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IsUnique } from '../../utils/decorators/is-unique';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCityDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @MinLength(3)
  @IsUnique({ message: 'City name is already in use.' })
  @ApiProperty({
    example: 'New York',
    required: true,
    description: 'The name of the city.',
    maxLength: 32,
    minLength: 3,
  })
  name: string;
}

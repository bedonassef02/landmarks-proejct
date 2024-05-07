import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export class CreateLocationDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    example: 'Egypt Landmark',
    required: true,
    description: 'The name of the location.',
  })
  name: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    example: 30.0444,
    required: true,
    description: 'The latitude coordinate of the location.',
  })
  latitude: number;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  @ApiProperty({
    example: 31.2357,
    required: true,
    description: 'The longitude coordinate of the location.',
  })
  longitude: number;
}

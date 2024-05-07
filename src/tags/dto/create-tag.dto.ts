import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IsUnique } from '../../utils/decorators/is-unique';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @MinLength(3)
  @IsUnique({ message: 'Tag name is already in use.' })
  @ApiProperty({
    example: 'Historical',
    required: true,
    description: 'The name of the tag.',
    maxLength: 32,
    minLength: 3,
  })
  name: string;
}

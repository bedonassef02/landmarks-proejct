import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';
import { IsUnique } from '../../utils/decorators/is-unique';

export class CreateTagDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(32)
  @MinLength(3)
  @IsUnique({ message: 'tag name is already exist' })
  name: string;
}

import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsUnique } from '../../utils/decorators/is-unique';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 32)
  readonly name!: string;
  @IsNotEmpty()
  @IsNotEmpty()
  @Length(8, 32)
  @IsUnique({ message: 'email is already in use' })
  readonly email!: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  password: string;
}

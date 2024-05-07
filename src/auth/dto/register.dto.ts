import { IsNotEmpty, IsString, Length } from 'class-validator';
import { IsUnique } from '../../utils/decorators/is-unique';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @IsNotEmpty()
  @IsString()
  @Length(3, 32)
  @ApiProperty({
    example: 'example',
    required: true,
    description: 'The name of the user.',
    maxLength: 32,
    minLength: 3,
  })
  readonly name: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  @IsUnique({ message: 'Email is already in use.' })
  @ApiProperty({
    example: 'example@example.com',
    required: true,
    description: 'The email address of the user.',
    maxLength: 32,
    minLength: 8,
  })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  @ApiProperty({
    example: 'password123',
    required: true,
    description: 'The password of the user.',
    maxLength: 32,
    minLength: 8,
  })
  password: string;
}

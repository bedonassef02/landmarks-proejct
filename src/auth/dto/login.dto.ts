import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
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

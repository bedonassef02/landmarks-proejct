import { IsNotEmpty, IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  @ApiProperty({
    example: 'oldpassword',
    required: true,
    description: 'The current password of the user.',
    maxLength: 32,
    minLength: 8,
  })
  current_password: string;

  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  @ApiProperty({
    example: 'newpassword',
    required: true,
    description: 'The new password of the user.',
    maxLength: 32,
    minLength: 8,
  })
  new_password: string;
}

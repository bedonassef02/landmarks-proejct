import { IsNotEmpty, IsString, Length } from 'class-validator';

export class UpdatePasswordDto {
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  current_password: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  new_password: string;
}

import { IsNotEmpty, IsString, Length } from 'class-validator';

export class LoginDto {
  @IsNotEmpty()
  @IsNotEmpty()
  @Length(8, 32)
  readonly email!: string;
  @IsNotEmpty()
  @IsString()
  @Length(8, 32)
  password: string;
}

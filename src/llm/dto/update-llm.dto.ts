import { IsNotEmpty } from 'class-validator';

export class UpdateLlmDto {
  @IsNotEmpty()
  url: string;
}

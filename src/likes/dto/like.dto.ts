import { IsMongoId, IsNotEmpty } from 'class-validator';

export class LikeDto {
  @IsNotEmpty()
  @IsMongoId()
  landmark: string;
  user?: string;
}

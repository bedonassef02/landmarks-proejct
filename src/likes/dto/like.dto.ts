import { IsMongoId, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LikeDto {
  @IsNotEmpty()
  @IsMongoId()
  @ApiProperty({
    example: '6072d4bda5f1e64e2401df22',
    required: true,
    description: 'The ID of the landmark being liked.',
  })
  landmark: string;
  user?: string;
}

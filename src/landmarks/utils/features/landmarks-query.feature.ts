import { QueryFeature } from '../../../utils/features/query.feature';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LandmarksQueryFeature extends QueryFeature {
  @Expose({ name: 'skip' })
  get skip(): number {
    return (this.page - 1) * this.limit;
  }

  @Expose({ name: 'searchQuery' })
  get searchQuery(): any {
    return [
      {
        name: { $regex: this.search, $options: 'i' },
        description: { $regex: this.search, $options: 'i' },
      },
    ];
  }

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: '6072d4bda5f1e64e2401df22,6072d4bda5f1e64e2401df22',
    description: 'Comma-separated IDs of cities.',
  })
  cities?: string;

  @IsOptional()
  @IsString()
  // @IsMongoId()
  @ApiProperty({
    example: '6072d4bda5f1e64e2401df22',
    description: 'ID of the tag.',
  })
  tags?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  @ApiProperty({
    example: true,
    description: 'Indicates whether the landmark is recommended.',
  })
  is_recommended?: boolean;
}

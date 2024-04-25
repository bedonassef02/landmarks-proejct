import { QueryFeature } from '../../../utils/features/query.feature';
import { Expose, Type } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

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
  cities?: string;

  @IsOptional()
  @IsString()
  // @IsMongoId()
  tags?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  is_recommended?: boolean;
}

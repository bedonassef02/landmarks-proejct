import { QueryFeature } from '../../../utils/features/query.feature';
import { Expose } from 'class-transformer';
import { IsMongoId, IsOptional } from 'class-validator';

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
  @IsMongoId()
  city?: string;
}

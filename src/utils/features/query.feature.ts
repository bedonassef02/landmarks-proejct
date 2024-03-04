import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class QueryFeature {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  public readonly page: number = 1;
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  public readonly limit: number = 10;
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/,/g, ' ') : value,
  )
  sort = '-createdAt';
  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/,/g, ' ') : value,
  )
  fields = 'name price likes_count cover_image';

  @IsOptional()
  @IsString()
  search = '';
}

import { Transform, Type } from 'class-transformer';
import { IsInt, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class QueryFeature {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    example: 1,
    description: 'The page number.',
  })
  public readonly page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    example: 100,
    description: 'The maximum number of items to return per page.',
  })
  public readonly limit: number = 100;

  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/,/g, ' ') : value,
  )
  @ApiProperty({
    example: '-createdAt',
    description: 'Sort order (- for descending, + for ascending).',
  })
  sort = '-createdAt';

  @IsOptional()
  @IsString()
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/,/g, ' ') : value,
  )
  @ApiProperty({
    example: 'name price likes_count cover_image views',
    description: 'Fields to include in the response.',
  })
  fields = 'name price likes_count cover_image views';

  @IsOptional()
  @IsString()
  @ApiProperty({
    example: 'Cairo',
    description: 'Search query.',
  })
  search = '';
}

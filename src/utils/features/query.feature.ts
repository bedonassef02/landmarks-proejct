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
    required: false,
  })
  public readonly page: number = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @ApiProperty({
    example: 100,
    description: 'The maximum number of items to return per page.',
    required: false,
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
    required: false,
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
    required: false,
  })
  fields = 'name price likes_count cover_image views';

  @ApiProperty({
    example: 'Cairo',
    description: 'Search query.',
    required: false,
  })
  @IsOptional()
  @IsString()
  search = '';
}

import { QueryFeature } from '../features/query.feature';
import { LandmarkDocument } from '../../landmarks/entities/landmark.entity';
import { PaginationResponseFeature } from '../features/pagination-response.feature';

type dataType = LandmarkDocument[];

export function paginationDetails(
  query: QueryFeature,
  data: dataType,
  totalItems: number,
): PaginationResponseFeature {
  const totalPages = Math.ceil(totalItems / query.limit);

  return {
    page: query.page,
    totalItems,
    pageSize: query.limit,
    totalPages,
    data,
  };
}

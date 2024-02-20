import { LandmarkDocument } from '../../landmarks/entities/landmark.entity';

export class PaginationResponseFeature {
  page: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  data: LandmarkDocument[];
}

import { Pageable } from './common.d.ts';

export interface VideoType {
  description: string;
  poster?: string;
  ratingType: string;
  title: string;
  videoId: number;
}

export interface VideoSearchResult {
  content: VideoType[];
  empty: boolean;
  first: boolean;
  last: boolean;
  number: number;
  numberOfElements: number;
  pageable: Pageable;
  totalElements: number;
  totalPages: number;
}

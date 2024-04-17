import { Page } from './common.ts';

export interface VideoType {
  description: string;
  poster?: string;
  ratingType: string;
  title: string;
  videoId: number;
}

export interface Episode {
  description: string;
  episodeId: number;
  episodeUrl: string;
  releasedAt: string;
  title: string;
}

export interface VideoDetailsResponse {
  description: string;
  episodeResponseDtoPage: Page<Episode>;
  genreTypeList: string[];
  posterUrl: string;
  releasedAt: string;
  title: string;
  videoId: number;
}

export interface ChartResponseDto {
  poster_url: string;
  videoDescription: string;
  videoId: number;
  videoTitle: string;
}

export interface SearchResponse {
  titles: string[];
}

export type VideoSearchDto = {
  description: string;
  poster_url: string;
  released_at: string;
  title: string;
  video_id: number;
};

export type VideoSearchResponseDto = {
  totalPage: number;
  totalSize: number;
  videoReadResponseDtoList: VideoSearchDto[];
};

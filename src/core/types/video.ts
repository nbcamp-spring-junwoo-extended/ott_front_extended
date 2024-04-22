import { DateArray, Page } from './common.ts';

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
  posterUrl: string;
  videoDescription: string;
  videoId: number;
  videoTitle: string;
}

export interface SearchResponse {
  titles: string[];
}

export type VideoSearchResultDto = {
  description: string;
  posterUrl: string;
  releaseAt: DateArray;
  title: string;
  videoId: number;
};

export type VideoRandomSearchDto = {
  posterUrl: string;
  title: string;
  videoId: number;
};

export type VideoRandomSearchResponseDto = {
  videos: VideoRandomSearchDto[];
};

export type VideoSearchResponseDto = {
  totalPage: number;
  totalSize: number;
  videos: VideoSearchResultDto[];
};

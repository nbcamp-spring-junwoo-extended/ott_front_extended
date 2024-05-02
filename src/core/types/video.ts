import { DateArray, Page } from './common.ts';
import { GenreLabelEng } from './search.ts';

export interface Episode {
  description: string;
  episodeId: number;
  episodeUrl: string;
  releasedAt: DateArray;
  title: string;
}

export interface VideoDetailsResponse {
  description: string;
  episodeResponseDtoPage: Page<Episode>;
  genreTypeList: GenreLabelEng[];
  posterUrl: string;
  releasedAt: DateArray;
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

export type VideoRandomSearchDto = {
  posterUrl: string;
  title: string;
  videoId: number;
};

export type VideoRandomSearchResponseDto = {
  videos: VideoRandomSearchDto[];
};

export type VideoResponseDto = {
  membershipType: string;
  posterUrl: URL;
  title: string;
  videoId: number;
};

export type LikeReadResponseDto = {
  posterUrl: URL;
  title: string;
  videoId: number;
};

import { Page } from './common';

export interface VideoType {
  description: string;
  poster?: string;
  ratingType: string;
  title: string;
  videoId: number;
}

export interface VideoReadResponse {
  poster_url: string;
  title: string;
  video_id: number;
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

export interface RankingReadResponse {
  poster_url: string;
  videoDescription: string;
  videoId: number;
  videoTitle: string;
}

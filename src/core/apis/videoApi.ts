import { genreToEng } from '../../utils/videoUtils.ts';
import { apiClient } from '../di/apiClient.ts';
import { ApiResponse, Page } from '../types/common.ts';
import { GenreLabel, OperationLabel, SearchType } from '../types/search.ts';
import {
  ChartResponseDto,
  SearchResponse,
  VideoDetailsResponse,
  VideoRandomSearchResponseDto,
  VideoResponseDto,
} from '../types/video.ts';

export const getVideo = async (videoId: number): ApiResponse<VideoDetailsResponse> =>
  apiClient.get(`/api/v1/videos/${videoId}`);

export const getSearchComplete = async (title: string, page: number = 0): ApiResponse<SearchResponse> =>
  apiClient.get('/api/v2/complete/search', {
    params: {
      input: title,
      page,
    },
  });

export const searchVideosByInput = async (
  input: string,
  page?: number,
  type: SearchType = 'TITLE',
  signal?: AbortSignal,
): ApiResponse<Page<VideoResponseDto>> =>
  apiClient.get('/api/v2/videos/search', {
    params: {
      input,
      page,
      type,
    },
    signal,
  });

export const searchVideosByGenre = async (
  operation: OperationLabel,
  genre: GenreLabel[],
  page: number = 0,
  signal?: AbortSignal,
): ApiResponse<Page<VideoResponseDto>> => {
  const genreParam: string = genre.map(genreToEng).join(',');

  return apiClient.get('/api/v1/videos', {
    params: {
      g: genreParam,
      o: operation === '그리고',
      page,
    },
    signal,
  });
};

export const getRandomVideos = async (): ApiResponse<VideoRandomSearchResponseDto> =>
  apiClient.get('/api/v2/videos/random');

export const getRankingVideos = async (): ApiResponse<ChartResponseDto[]> => apiClient.get(`/api/v1/chart`);

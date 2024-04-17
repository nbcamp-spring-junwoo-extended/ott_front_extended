import { apiClient } from '../di/apiClient.ts';
import { ApiResponse } from '../types/common.ts';
import { ChartResponseDto, SearchResponse, VideoDetailsResponse, VideoSearchResponseDto } from '../types/video.ts';

export const getVideo = async (videoId: number): ApiResponse<VideoDetailsResponse> =>
  apiClient.get(`/api/v1/videos/${videoId}`);

export const getSearchComplete = async (title: string): ApiResponse<SearchResponse> =>
  apiClient.get('/api/v2/complete/search', {
    params: {
      input: title,
    },
  });

export const searchVideos = async (searchOption: string, title: string): ApiResponse<VideoSearchResponseDto> =>
  apiClient.get('/api/v2/videos/search', {
    params: {
      input: title,
      searchOption,
    },
  });

export const getRankingVideos = async (): ApiResponse<ChartResponseDto[]> => apiClient.get(`/api/v1/chart`);

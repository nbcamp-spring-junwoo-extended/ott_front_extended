import { AxiosResponse } from 'axios';

import { apiClient } from '../di/apiClient.ts';
import { CommonResponse } from '../types/common.ts';
import { SearchResponse, VideoSearchResponseDto } from '../types/video.ts';

export const getVideo = async (videoId: number) => apiClient.get(`/api/v1/videos/${videoId}`);

export const getSearchComplete = async (title: string): Promise<AxiosResponse<CommonResponse<SearchResponse>>> =>
  apiClient.get('/api/v2/complete/search', {
    params: {
      input: title,
    },
  });

export const searchVideos = async (
  searchOption: string,
  title: string,
): Promise<AxiosResponse<CommonResponse<VideoSearchResponseDto>>> =>
  apiClient.get('/api/v2/videos/search', {
    params: {
      input: title,
      searchOption,
    },
  });

export const getRankingVideos = async () => apiClient.get(`/api/v1/chart`);

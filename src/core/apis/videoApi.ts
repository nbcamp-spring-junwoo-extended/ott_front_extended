import { apiClient } from '../di/client.ts';

export const getSearchComplete = (title: string) =>
  apiClient.get('/api/v2/complete/search', {
    params: {
      input: title,
    },
  });

export const searchVideos = (searchOption: string, title: string) =>
  apiClient.get('/api/v2/videos/search', {
    params: {
      input: title,
    },
  });

export const getVideo = (videoId: number) => apiClient.get(`/api/v1/videos/${videoId}`);

export const getRankingVideos = () => apiClient.get(`/api/v1/chart`);

import { apiClient } from '../di/client.ts';

export const getSearchComplete = (title: string) =>
  apiClient.get('/api/v2/complete/search', {
    params: {
      input : title,
    },
  });
// Promise.resolve({ data: [] });

export const searchVideos = (searchOption: string, title: string) =>
  apiClient.get('/api/v2/videos/search', {
    params: {
      input : title,
    },
  });

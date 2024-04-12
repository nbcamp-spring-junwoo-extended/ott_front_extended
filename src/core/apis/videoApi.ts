import { apiClient } from '../di/client.ts';

export const getSearchComplete = (title: string) =>
  // apiClient.get('/api/v1/complete/search', {
  //   params: {
  //     title,
  //   },
  // });
  Promise.resolve({ data: [] });

export const searchVideos = (searchOption: string, title: string) =>
  apiClient.get('/api/v1/videos/search', {
    params: {
      title,
    },
  });

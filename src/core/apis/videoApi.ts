import { apiClient } from '../di/client.ts';

export const findVideos = async () =>
  apiClient.get('/api/v1/complete/search', {
    params: {
      query: 'query',
    },
  });

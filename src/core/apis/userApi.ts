import { apiClient } from './client.ts';

type UserProfile = {
  name;
};

export const myProfile = async () => {
  const response = await apiClient.get('/api/v1/users/my-info');
};

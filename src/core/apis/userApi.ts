import { apiClient } from './client.ts';

type UserProfile = {
  name: string;
};

export const myProfile: UserProfile = async () => {
  const response = await apiClient.get('/api/v1/users/my-info');
};

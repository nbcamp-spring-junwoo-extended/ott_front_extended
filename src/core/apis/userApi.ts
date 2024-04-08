import { apiClient } from './client.ts';

export type UserProfile = {
  userId: number;
  username: string;
  email: string;
  born: string;
  authorityType: string;
  membershipType: string;
};

export const myProfile = async () => {
  const response = await apiClient.get('/api/v1/users/me');
  return response;
};

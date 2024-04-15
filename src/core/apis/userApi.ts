import { apiClient } from '../di/apiClient.ts';

export const myProfile = async () => {
  const response = await apiClient.get('/api/v1/users/me');
  return response;
};

export const myCards = async () => {
  const response = await apiClient.get('/api/v1/users/me/cards');
  return response;
};

export const createCard = async (props) => {
  const response = await apiClient.post('/api/v1/users/me/cards', props);
  return response;
};

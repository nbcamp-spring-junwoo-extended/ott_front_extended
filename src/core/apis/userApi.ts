import { apiClient } from '../di/client.ts';

export type UserProfile = {
  authorityType: string;
  born: string;
  email: string;
  membershipType: string;
  userId: number;
  username: string;
};

export interface CreateCardFormProps {
  cardExpirationMonth: string;
  cardExpirationYear: string;
  cardNumber: string;
  cardPassword: string;
  customerName: string;
}

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

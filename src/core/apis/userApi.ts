import { apiClient } from '../di/client.ts';

export type UserProfile = {
  userId: number;
  username: string;
  email: string;
  born: string;
  authorityType: string;
  membershipType: string;
};

export interface CreateCardFormProps {
  customerName: string;
  cardNumber: string;
  cardExpirationYear: string;
  cardExpirationMonth: string;
  cardPassword: string;
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

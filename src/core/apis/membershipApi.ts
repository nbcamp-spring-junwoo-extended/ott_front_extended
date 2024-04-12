import { apiClient } from '../di/client.ts';
import { PaymentTypes } from '../types/paymentTypes.ts';

export type UserProfile = {
  userId: number;
  username: string;
  email: string;
  born: string;
  authorityType: string;
  membershipType: string;
};

export const getMemberships = async (): Promise<PaymentTypes[]> => {
  const response = await apiClient.get('/api/v1/memberships');
  return response?.data?.data;
};

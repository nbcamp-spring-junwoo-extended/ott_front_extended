import { apiClient } from '../di/apiClient.ts';
import { Payment } from '../types/payment.d.ts';

export const getMemberships = async (): Promise<Payment[]> => {
  const response = await apiClient.get('/api/v1/memberships');
  return response?.data?.data;
};

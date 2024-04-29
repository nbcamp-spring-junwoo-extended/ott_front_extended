import { apiClient } from '../di/apiClient.ts';
import { ApiResponse } from '../types/common.ts';
import { Payment } from '../types/payment.ts';

export const getMemberships = (): ApiResponse<Payment[]> => apiClient.get('/api/v1/memberships');

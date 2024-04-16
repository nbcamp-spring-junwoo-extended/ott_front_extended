import { apiClient } from '../di/apiClient.ts';
import { CommonResponse } from '../types/common.ts';
import { Payment } from '../types/payment.ts';

export const getMemberships = () => apiClient.get<CommonResponse<Payment[]>>('/api/v1/memberships');

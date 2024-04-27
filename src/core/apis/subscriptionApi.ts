import { apiClient } from '../di/apiClient.ts';
import { ApiResponse } from '../types/common.ts';
import { OrderHistory } from '../types/payment.ts';

export const postBillingKey = async (authKey: string, customerKey: string = ''): ApiResponse<null> =>
  apiClient.post('/api/v1/users/me/billing/key', {
    authKey,
    customerKey,
  });

export const requestSubscription = async (
  userId: number,
  cardId: number,
  membershipType: string,
  couponIssuanceId?: number,
): ApiResponse<null> =>
  apiClient.post(`/api/v1/users/${userId}/subscriptions`, null, {
    params: {
      card: cardId,
      coupon: couponIssuanceId,
      membership: membershipType,
    },
  });

export const getOrderHistory = async (orderId: string, signal?: AbortSignal): ApiResponse<OrderHistory> =>
  apiClient.get(`/api/v1/orders/${orderId}`, { signal });

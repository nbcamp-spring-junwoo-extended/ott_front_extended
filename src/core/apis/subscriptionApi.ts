import { AxiosResponse } from 'axios';

import { apiClient } from '../di/apiClient.ts';
import { CommonResponse } from '../types/common.ts';

export const postBillingKey = async (
  authKey: string,
  customerKey: string = '',
): Promise<AxiosResponse<CommonResponse<null>>> =>
  apiClient.post('/api/v1/users/me/billing/key', {
    authKey,
    customerKey,
  });

export const requestSubscription = async (
  userId: number,
  cardId: number,
  membershipType: string,
  couponId?: number,
): Promise<AxiosResponse<CommonResponse<null>>> =>
  apiClient.post(`/api/v1/users/${userId}/subscriptions`, null, {
    params: {
      card: cardId,
      coupon: couponId,
      membership: membershipType,
    },
  });

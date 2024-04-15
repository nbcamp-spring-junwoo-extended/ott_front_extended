import { apiClient } from '../di/apiClient.ts';

export const postBillingKey = async (customerKey: string, authKey: string) =>
  apiClient.post('/api/v1/users/me/billing/key', {
    authKey,
    customerKey,
  });

export const requestSubscription = async (
  userId: number,
  cardId: number,
  membershipType: string,
  couponId?: number,
) =>
  apiClient.post(`/api/v1/users/${userId}/subscriptions`, null, {
    params: {
      card: cardId,
      coupon: couponId,
      membership: membershipType,
    },
  });

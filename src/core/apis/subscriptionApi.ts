import { apiClient } from '../di/client.ts';

export const requestSubscription = async (
  userId: number,
  cardId: number,
  membershipType: string,
  couponId?: number,
) => {
  console.log('userId', userId);
  console.log('cardId', cardId);
  console.log('membershipType', membershipType);
  console.log('couponId', couponId);

  return apiClient.post(`/api/v1/users/${userId}/subscriptions`, null, {
    params: {
      card: cardId,
      membership: membershipType,
      coupon: couponId,
    },
  });
};

import { apiClient } from './client.ts';

export const requestSubscription = async (
  userId: number,
  cardId: number,
  membershipId: number,
  couponId?: number,
) => {
  const response = await apiClient.post(
    `/api/v1/users/${userId}/subscriptions)`,
    {
      params: {
        card: cardId,
        membership: membershipId,
        coupon: couponId,
      },
    },
  );

  return response;
};

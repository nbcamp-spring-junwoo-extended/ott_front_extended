import { apiClient } from '../di/apiClient.ts';
import { ApiResponse, Page } from '../types/common.ts';
import { UserCard, UserCoupon, UserCustomerKey, UserProfile, UserSubscriptionHistory } from '../types/user.ts';

type PutUserRequestDto = {
  checkedPassword: string;
  newBorn?: string;
  newEmail?: string;
  newPassword?: string;
};

export const myProfile = async (): ApiResponse<UserProfile> => apiClient.get('/api/v1/users/me');

export const myCards = async (): ApiResponse<UserCard[]> => apiClient.get('/api/v1/users/me/cards');

export const myCoupons = async (): ApiResponse<Page<UserCoupon>> => apiClient.get('/api/v1/users/me/coupons');

export const myCustomerKey = async (): ApiResponse<UserCustomerKey> => apiClient.get('/api/v1/users/me/key');

export const mySubscriptionHistories = async (signal?: AbortSignal): ApiResponse<UserSubscriptionHistory[]> =>
  apiClient.get('/api/v1/users/me/subscriptions', {
    signal,
  });

export const updateProfile = async (userId: number, values: PutUserRequestDto): ApiResponse<null> => {
  return apiClient.put(`/api/v1/users/${userId}`, values);
};

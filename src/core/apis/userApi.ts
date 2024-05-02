import { apiClient } from '../di/apiClient.ts';
import { ApiResponse, Page } from '../types/common.ts';
import { UserCard, UserCoupon, UserCustomerKey, UserProfile, UserSubscriptionHistory } from '../types/user.ts';

type PutUserRequestDto = {
  checkedPassword: string;
  newBorn?: string;
  newEmail?: string;
  newPassword?: string;
};

export const myProfile = async (signal?: AbortSignal): ApiResponse<UserProfile> =>
  apiClient.get('/api/v1/users/me', { signal });

export const myCards = async (signal?: AbortSignal): ApiResponse<UserCard[]> =>
  apiClient.get('/api/v1/users/me/cards', { signal });

export const myCoupons = async (signal?: AbortSignal): ApiResponse<Page<UserCoupon>> =>
  apiClient.get('/api/v1/users/me/coupons', { signal });

export const myCustomerKey = async (): ApiResponse<UserCustomerKey> => apiClient.get('/api/v1/users/me/key');

export const mySubscriptionHistories = async (signal?: AbortSignal): ApiResponse<UserSubscriptionHistory[]> =>
  apiClient.get('/api/v1/users/me/subscriptions', {
    signal,
  });

export const updateProfile = async (userId: number, values: PutUserRequestDto): ApiResponse<null> => {
  return apiClient.put(`/api/v1/users/${userId}`, values);
};

import { apiClient } from '../di/apiClient.ts';
import { ApiResponse, Page } from '../types/common.ts';
import { UserCard, UserCoupon, UserCustomerKey, UserProfile } from '../types/user.ts';

export const myProfile = async (): ApiResponse<UserProfile> => apiClient.get('/api/v1/users/me');

export const myCards = async (): ApiResponse<UserCard[]> => apiClient.get('/api/v1/users/me/cards');

export const myCoupons = async (): ApiResponse<Page<UserCoupon>> => apiClient.get('/api/v1/users/me/coupons');

export const myCustomerKey = async (): ApiResponse<UserCustomerKey> => apiClient.get('/api/v1/users/me/key');

import { apiClient } from '../di/apiClient.ts';
import { CommonResponse } from '../types/common.ts';
import { UserCard, UserCustomerKey, UserProfile } from '../types/user.ts';

export const myProfile = async () => apiClient.get<CommonResponse<UserProfile>>('/api/v1/users/me');

export const myCards = async () => apiClient.get<CommonResponse<UserCard[]>>('/api/v1/users/me/cards');

export const myCustomerKey = async () => apiClient.get<CommonResponse<UserCustomerKey>>('/api/v1/users/me/key');

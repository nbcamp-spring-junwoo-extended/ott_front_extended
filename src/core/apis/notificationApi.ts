import { apiClient } from '../di/apiClient.ts';
import { ApiResponse, Page } from '../types/common.ts';
import { Notification, NotificationDetails } from '../types/notification.ts';

type AnnouncementsReadResponseDto = Notification;

export const getNotification = async (announcementId: number): ApiResponse<NotificationDetails> =>
  apiClient.get(`/api/v1/announcement/${announcementId}`);

export const getNotifications = async (): ApiResponse<Page<AnnouncementsReadResponseDto>> =>
  apiClient.get('/api/v1/announcement', {});

export const postCouponIssuance = async (couponId: number): ApiResponse<unknown> =>
  apiClient.post(`/api/v1/coupons/get-coupon/${couponId}`);

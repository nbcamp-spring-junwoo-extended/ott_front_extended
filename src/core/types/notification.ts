import { DateArray } from './common.ts';
import { CouponType } from './user.ts';

export type CouponReadResponseDto = {
  couponId: number;
  couponType: CouponType;
  description: string;
  discount: number;
  endAt: DateArray;
  membershipType: string;
  startAt: DateArray;
};

export type AnnouncementReadResponseDto = {
  content: string;
  couponReadResponseDto: CouponReadResponseDto;
  createdAt: DateArray;
  title: string;
};

export type Notification = {
  announcementId: number;
  title: string;
};

export type NotificationDetails = AnnouncementReadResponseDto;

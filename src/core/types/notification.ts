export type CouponReadResponseDto = {
  couponId: number;
  couponType: 'FIX' | 'RATIO';
  description: string;
  discount: number;
  endAt: string;
  membershipType: string;
  startAt: string;
};

export type AnnouncementReadResponseDto = {
  content: string;
  couponReadResponseDto: CouponReadResponseDto;
  createdAt: string;
  title: string;
};

export type Notification = {
  announcementId: number;
  title: string;
};

export type NotificationDetails = AnnouncementReadResponseDto;

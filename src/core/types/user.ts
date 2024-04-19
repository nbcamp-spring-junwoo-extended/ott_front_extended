import { DateArray } from './common.ts';

export type UserCard = {
  cardId: number;
  cardNickname: string;
  cardNumber: string;
};

export type UserCustomerKey = {
  customerKey: string;
};

export type UserProfile = {
  authorityType: string;
  born: DateArray;
  email: string;
  membershipType: string;
  userId: number;
  username: string;
};

export type CouponType = 'FIX' | 'RATIO';

export type UserCoupon = {
  couponId: number;
  couponType: CouponType;
  description: string;
  discount: number;
  endAt: DateArray;
  membershipType: string;
  startAt: DateArray;
};

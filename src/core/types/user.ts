import { DateArray } from './common.ts';

export enum MembershipType {
  'ROLE_BRONZE' = 'ROLE_BRONZE',
  'ROLE_GOLD' = 'ROLE_GOLD',
  'ROLE_NORMAL' = 'ROLE_NORMAL',
  'ROLE_SILVER' = 'ROLE_SILVER',
}

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
  membershipType: MembershipType;
  userId: number;
  username: string;
};

export type CouponType = 'FIX' | 'RATIO';

export type UserCoupon = {
  couponId: number;
  couponIssuanceId: number;
  couponType: CouponType;
  description: string;
  discount: number;
  endAt: DateArray;
  membershipType: MembershipType;
  startAt: DateArray;
};

export type UserSubscriptionHistory = {
  expireAt: DateArray;
  membershipType: MembershipType;
  orderId: string;
  startAt: DateArray;
  status: string;
  subscriptionHistoryId: number;
};

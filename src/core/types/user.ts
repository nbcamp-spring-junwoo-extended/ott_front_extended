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
  born: string;
  email: string;
  membershipType: string;
  userId: number;
  username: string;
};

export type UserCoupon = {
  couponId: number;
  couponType: string;
  description: string;
  discount: number;
  membershipType: string;
};

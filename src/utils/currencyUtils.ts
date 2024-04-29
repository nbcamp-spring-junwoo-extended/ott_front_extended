import { UserCoupon } from '../core/types/user.ts';

export const priceToKRW = (price: number) => {
  return new Intl.NumberFormat('ko', { currency: 'KRW', style: 'currency' }).format(price);
};

export const calculateDiscountedPrice = (price: number, coupon: UserCoupon | undefined) => {
  if (!coupon) {
    return price;
  }

  if (coupon.couponType === 'RATIO') {
    return price * (1 - coupon.discount / 100);
  }

  return price - coupon.discount;
};

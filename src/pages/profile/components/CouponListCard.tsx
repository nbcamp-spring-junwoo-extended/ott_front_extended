import { Card, List } from 'antd';
import React, { useState } from 'react';

import { UserCoupon } from '../../../core/types/user.ts';
import { CouponItem } from './components/CouponItem.tsx';
import { CouponListCardTitle } from './components/CouponListCardTitle.tsx';
import { useCouponListCard } from './useCouponListCard.ts';

const CouponListCard: React.FC = () => {
  const [coupons, setCoupons] = useState<UserCoupon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useCouponListCard(isLoading, setIsLoading, setCoupons);

  return (
    <Card title={<CouponListCardTitle />}>
      <List bordered dataSource={coupons} renderItem={(coupon) => <CouponItem coupon={coupon} />} />
    </Card>
  );
};

export default CouponListCard;

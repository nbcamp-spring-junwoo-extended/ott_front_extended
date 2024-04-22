import { Card, List, Typography } from 'antd';
import React, { useState } from 'react';

import { UserCoupon } from '../../../core/types/user.ts';
import { CouponItem } from './components/CouponItem.tsx';
import { CouponListCardTitle } from './components/CouponListCardTitle.tsx';
import { useFetchCoupons } from './hooks/useFetchCoupons.ts';

const CouponListCard: React.FC = () => {
  const [coupons, setCoupons] = useState<UserCoupon[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useFetchCoupons(isLoading, setIsLoading, setCoupons);

  return (
    <Card title={<CouponListCardTitle />}>
      <List
        bordered
        dataSource={coupons}
        header={
          <Typography.Paragraph style={{ marginBottom: 0, textAlign: 'end' }}>
            총 {coupons.length}개의 쿠폰 보유중
          </Typography.Paragraph>
        }
        renderItem={(coupon) => <CouponItem coupon={coupon} />}
      />
    </Card>
  );
};

export default CouponListCard;

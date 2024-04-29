import { Card, List, Typography } from 'antd';
import React from 'react';

import { useFetchCoupons } from '../../../hooks/user/useFetchCoupons.ts';
import { CouponItem } from './components/CouponItem.tsx';
import { CouponListCardTitle } from './components/CouponListCardTitle.tsx';

const CouponListCard: React.FC = () => {
  const { coupons, isLoading } = useFetchCoupons();

  return (
    <Card loading={isLoading} title={<CouponListCardTitle />}>
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

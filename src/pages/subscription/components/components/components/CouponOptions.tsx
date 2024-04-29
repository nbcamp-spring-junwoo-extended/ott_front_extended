import { Form, Select, Space, Typography } from 'antd';
import React from 'react';

import { UserCoupon } from '../../../../../core/types/user.ts';

const noCoupon: UserCoupon = {
  couponId: 0,
  description: '쿠폰 없음',
  discount: 0,
} as UserCoupon;

type CouponOptionsProps = {
  coupons: UserCoupon[];
};

export const CouponOptions: React.FC<CouponOptionsProps> = ({ coupons }) => {
  coupons = [noCoupon, ...coupons];
  return (
    <Form.Item label="쿠폰" name="couponIssuanceId">
      <Select placeholder="쿠폰을 선택 해주세요.">
        {coupons.map(({ couponIssuanceId, couponType, description, discount }) => (
          <Select.Option key={couponIssuanceId} value={couponIssuanceId}>
            <Space>
              <Typography.Text>{description}:</Typography.Text>
              <Typography.Text>
                {discount}
                {couponType === 'RATIO' ? '%' : '원'}
              </Typography.Text>
            </Space>
          </Select.Option>
        ))}
      </Select>
    </Form.Item>
  );
};

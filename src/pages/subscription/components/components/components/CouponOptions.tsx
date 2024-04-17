import { Form, Select, Space, Typography } from 'antd';
import React from 'react';

import { UserCoupon } from '../../../../../core/types/user.ts';

type CouponOptionsProps = {
  coupons: UserCoupon[];
};

export const CouponOptions: React.FC<CouponOptionsProps> = ({ coupons }) => (
  <Form.Item label="쿠폰" name="coupon">
    <Select placeholder="쿠폰을 선택 해주세요.">
      {coupons.map((coupon) => (
        <Select.Option key={coupon.couponId} value={coupon.couponId}>
          <Space>
            <Typography.Text>{coupon.description}:</Typography.Text>
            <Typography.Text>
              {coupon.discount}
              {coupon.couponType === 'RATIO' ? '%' : '원'}
            </Typography.Text>
          </Space>
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
);

import { Flex, List, Typography } from 'antd';
import React from 'react';

import { UserCoupon } from '../../../../core/types/user.ts';
import { dateArrayToString } from '../../../../utils/dateUtil.ts';

type CouponItemProps = {
  coupon: UserCoupon;
};
export const CouponItem: React.FC<CouponItemProps> = ({ coupon }) => {
  const { couponType, description, discount, endAt, membershipType, startAt } = coupon;
  const couponTypeString = couponType === 'RATIO' ? '%' : '원';
  return (
    <List.Item>
      <List.Item.Meta
        description={
          <Flex align="center" justify="space-between">
            <Typography.Text>
              {discount}
              {couponTypeString}
              할인
            </Typography.Text>
            <Typography.Text>
              {dateArrayToString(startAt)}~{dateArrayToString(endAt)}
            </Typography.Text>
          </Flex>
        }
        title={
          <Flex align="center" justify="space-between">
            <Typography.Text>{description}</Typography.Text>
            <Typography.Text>{membershipType.slice(5)}</Typography.Text>
          </Flex>
        }
      />
    </List.Item>
  );
};

import { Button, Flex, Typography } from 'antd';
import React from 'react';

import { UserCoupon } from '../../../../../core/types/user.ts';
import { calculateDiscountedPrice, priceToKRW } from '../../../../../utils/currencyUtils.ts';
import style from '../../SubscribeCard.module.css';

type SubscriptionFormFooterProps = {
  coupon?: UserCoupon | undefined;
  price: number;
};

const SubscriptionFormFooter: React.FC<SubscriptionFormFooterProps> = ({ coupon, price }) => {
  const discountedPrice = calculateDiscountedPrice(price, coupon);

  return (
    <Flex align="baseline" justify="flex-end">
      <Typography.Paragraph className={style.formTitle}>
        가격:{' '}
        {discountedPrice != price && (
          <>
            <del>{priceToKRW(price)}</del>
            &nbsp;→&nbsp;
          </>
        )}
        {priceToKRW(discountedPrice)}
      </Typography.Paragraph>
      <Button htmlType="submit" type="primary">
        신청
      </Button>
    </Flex>
  );
};

export default SubscriptionFormFooter;

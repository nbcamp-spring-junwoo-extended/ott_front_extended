import { Card, Typography } from 'antd';
import React from 'react';

import { CouponDetails } from './components/CouponDetails.tsx';
import NotificationDetailsTitle from './components/NotificationDetailsTi tle.tsx';
import { useNotificationDetailsScreen } from './useNotificationDetailsScreen.ts';

const NotificationDetailsScreen: React.FC = () => {
  const { isLoading, notification } = useNotificationDetailsScreen();
  const { content, couponReadResponseDto, title } = notification;

  return (
    <Card loading={isLoading} title={<NotificationDetailsTitle title={title} />}>
      <Typography.Paragraph>{content}</Typography.Paragraph>
      {couponReadResponseDto && <CouponDetails coupon={couponReadResponseDto} />}
    </Card>
  );
};

export default NotificationDetailsScreen;

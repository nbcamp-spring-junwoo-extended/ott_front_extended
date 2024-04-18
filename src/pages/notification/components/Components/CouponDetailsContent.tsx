import { GiftOutlined } from '@ant-design/icons';
import { Flex, Typography } from 'antd';
import React from 'react';

import styles from '../CouponDetails.module.css';

type CouponDetailsContentProps = {
  couponType: 'FIX' | 'RATIO';
  discount: number;
  membershipType: string;
} & React.ComponentProps<'div'>;

const CouponDetailsContent: React.FC<CouponDetailsContentProps> = ({ couponType, discount, membershipType }) => {
  const leftContent = `사용 가능 대상: ${membershipType.slice(5)}`;
  const rightContent = couponType === 'FIX' ? `$${discount}` : `${discount}%`;
  return (
    <Flex align="center" justify="space-between" vertical>
      <GiftOutlined className={styles.cardIcon} />
      <Flex justify="space-between" style={{ marginTop: '60px', width: '100%' }}>
        <Typography.Paragraph className={styles.cardExtra} style={{ marginBottom: 0 }}>
          {leftContent}
        </Typography.Paragraph>
        <Typography.Paragraph className={styles.cardExtra} style={{ marginBottom: 0 }}>
          {rightContent}할인
        </Typography.Paragraph>
      </Flex>
    </Flex>
  );
};

export default CouponDetailsContent;

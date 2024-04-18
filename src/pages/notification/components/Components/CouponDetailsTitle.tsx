import { Typography } from 'antd';
import React from 'react';

import styles from '../CouponDetails.module.css';

type CouponDetailsTitleProps = {
  title: string;
};

const CouponDetailsTitle: React.FC<CouponDetailsTitleProps> = ({ title }) => (
  <Typography.Paragraph className={styles.title} style={{ color: 'white', fontSize: 30, margin: 0 }}>
    {title}
  </Typography.Paragraph>
);

export default CouponDetailsTitle;

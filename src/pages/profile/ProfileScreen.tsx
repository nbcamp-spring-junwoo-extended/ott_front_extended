import { Col, Row } from 'antd';
import React from 'react';

import CardListCard from './components/CardListCard.tsx';
import CouponListCard from './components/CouponListCard.tsx';
import ProfileCard from './components/ProfileCard.tsx';
import { SubscriptionHistory } from './components/SubscriptionHistory.tsx';

const ProfileScreen: React.FC = () => (
  <Row gutter={[16, 16]}>
    <Col xl={12} xs={24}>
      <ProfileCard />
    </Col>
    <Col xl={12} xs={24}>
      <CouponListCard />
    </Col>
    <Col xl={12} xs={24}>
      <CardListCard />
    </Col>
    <Col xl={12} xs={24}>
      <SubscriptionHistory />
    </Col>
  </Row>
);

export default ProfileScreen;

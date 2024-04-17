import { Col, Row } from 'antd';
import React from 'react';

import CardListCard from './components/CardListCard.tsx';
import ProfileCard from './components/ProfileCard.tsx';

const ProfileScreen: React.FC = () => (
  <Row gutter={[16, 16]}>
    <Col xl={12} xs={24}>
      <ProfileCard />
    </Col>
    <Col xl={12} xs={24}>
      <CardListCard />
    </Col>
  </Row>
);

export default ProfileScreen;

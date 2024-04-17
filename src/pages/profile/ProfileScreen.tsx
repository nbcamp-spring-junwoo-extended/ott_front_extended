import { Col, Row } from 'antd';
import React, { useState } from 'react';

import { UserCard } from '../../core/types/user.ts';
import CardListCard from './components/CardListCard.tsx';
import ProfileCard from './components/ProfileCard.tsx';
import { useProfileScreenHooks } from './components/UseProfileScreen.hooks.tsx';

const ProfileScreen: React.FC = () => {
  const [cards, setCards] = useState<UserCard[]>([]);

  useProfileScreenHooks({ setCards });

  return (
    <Row gutter={[16, 16]}>
      <Col xl={12} xs={24}>
        <ProfileCard />
      </Col>
      <Col xl={12} xs={24}>
        <CardListCard cards={cards} />
      </Col>
    </Row>
  );
};

export default ProfileScreen;

import React, { useEffect, useState } from 'react';
import { Col, Row } from 'antd';
import { myCards, myProfile, UserProfile } from '../../core/apis/userApi.ts';
import ProfileCard from './components/ProfileCard.tsx';
import CardsCard from './components/CardsCard.tsx';

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: 0,
    username: '',
    born: '',
    authorityType: '',
    email: '',
    membershipType: '',
  });

  const [cards, setCards] = useState([]);

  useEffect(() => {
    myProfile().then((response) => setUserProfile(response.data.data));
    myCards().then((response) => setCards(response.data.data));
  }, []);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} xl={12}>
        <ProfileCard userProfile={userProfile} />
      </Col>
      <Col xs={24} xl={12}>
        <CardsCard cards={cards} />
      </Col>
    </Row>
  );
};

export default Profile;

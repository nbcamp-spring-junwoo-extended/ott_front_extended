import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { myCards, myProfile, UserProfile } from '../../core/apis/userApi.ts';
import { userActions } from '../../reducer/userSlice.ts';
import CardsCard from './components/CardsCard.tsx';
import ProfileCard from './components/ProfileCard.tsx';

const ProfileScreen: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: 0,
    username: '',
    born: '',
    authorityType: '',
    email: '',
    membershipType: '',
  });
  const [cards, setCards] = useState<any[]>([]);

  const dispatch = useDispatch();

  useEffect(() => {
    myProfile().then((response) => {
      const _userProfile = response?.data?.data;
      dispatch(userActions.updateUserId({ userId: _userProfile?.userId }));
      setUserProfile(_userProfile);
    });
    myCards().then((response) => {
      const _cards = response?.data?.data;
      setCards(_cards);
    });
  }, [dispatch]);

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

export default ProfileScreen;

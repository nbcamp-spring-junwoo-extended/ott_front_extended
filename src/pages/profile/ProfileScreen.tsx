import { Col, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { UserProfile, myCards, myProfile } from '../../core/apis/userApi.ts';
import { userActions } from '../../reducer/userSlice.ts';
import CardsCard from './components/CardsCard.tsx';
import ProfileCard from './components/ProfileCard.tsx';

const ProfileScreen: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    authorityType: '',
    born: '',
    email: '',
    membershipType: '',
    userId: 0,
    username: '',
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
      <Col xl={12} xs={24}>
        <ProfileCard userProfile={userProfile} />
      </Col>
      <Col xl={12} xs={24}>
        <CardsCard cards={cards} />
      </Col>
    </Row>
  );
};

export default ProfileScreen;

import { Col, Row, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { myCards, myProfile } from '../../core/apis/userApi.ts';
import { userActions } from '../../core/reducer/userSlice.ts';
import { UserCard, UserProfile } from '../../core/types/user.ts';
import CardListCard from './components/CardListCard.tsx';
import ProfileCard from './components/ProfileCard.tsx';

const initialUserState = {
  authorityType: '',
  born: '',
  email: '',
  membershipType: '',
  userId: 0,
  username: '',
};

const ProfileScreen: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserState);
  const [cards, setCards] = useState<UserCard[]>([]);

  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProfileAndCards = async () => {
      try {
        const [responseProfile, responseCards] = await Promise.all([myProfile(), myCards()]);

        const responseUserProfile: UserProfile = responseProfile?.data?.data;
        dispatch(userActions.updateUserId({ userId: responseUserProfile?.userId }));
        setUserProfile(responseUserProfile);

        const responseUserCards: UserCard[] = responseCards?.data?.data;
        setCards(responseUserCards);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          message.error(error.message);
        }
      }
    };

    fetchProfileAndCards().then();
  }, [dispatch]);

  return (
    <Row gutter={[16, 16]}>
      <Col xl={12} xs={24}>
        <ProfileCard userProfile={userProfile} />
      </Col>
      <Col xl={12} xs={24}>
        <CardListCard cards={cards} />
      </Col>
    </Row>
  );
};

export default ProfileScreen;

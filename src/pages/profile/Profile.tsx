import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Col, Row } from 'antd';
import { myCards, myProfile, UserProfile } from '../../core/apis/userApi.ts';
import ProfileCard from './components/ProfileCard.tsx';
import CardsCard from './components/CardsCard.tsx';
import { userActions } from '../../reducer/userSlice.ts';
import { cardActions } from '../../reducer/cardSlice.ts';

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
  const dispatch = useDispatch();

  useEffect(() => {
    myProfile().then((response) => {
      dispatch(
        userActions.updateUserId({ userId: response?.data?.data?.userId }),
      );
      setUserProfile(response.data.data);
    });
    myCards().then((response) => {
      const responseCards = response?.data?.data;
      console.log(responseCards);
      dispatch(cardActions.updateCards({ cards: responseCards }));
      setCards(responseCards);
    });
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

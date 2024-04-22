import { Card, List } from 'antd';
import React, { useState } from 'react';

import { UserCard } from '../../../core/types/user.ts';
import CardItem from './components/CardItem.tsx';
import { CardListCardTitle } from './components/CardListCardTitle.tsx';
import { useFetchCards } from './hooks/useFetchCards.ts';

const CardListCard: React.FC = () => {
  const [cards, setCards] = useState<UserCard[]>([]);

  useFetchCards(setCards);

  return (
    <Card title={<CardListCardTitle />}>
      <List bordered dataSource={cards} renderItem={(item) => <CardItem card={item} />} />
    </Card>
  );
};

export default CardListCard;

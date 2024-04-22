import { Card, List } from 'antd';
import React from 'react';

import { useFetchCards } from '../../../hooks/user/useFetchCards.ts';
import CardItem from './components/CardItem.tsx';
import { CardListCardTitle } from './components/CardListCardTitle.tsx';

const CardListCard: React.FC = () => {
  const { cards } = useFetchCards();

  return (
    <Card title={<CardListCardTitle />}>
      <List bordered dataSource={cards} renderItem={(item) => <CardItem card={item} />} />
    </Card>
  );
};

export default CardListCard;

import { Button, Card, Typography } from 'antd';

import React, { useState } from 'react';
import style from '../Profile.module.css';
import CreateCardForm from './CreateCardForm.tsx';

const CardsCardTitle: React.FC = () => {
  const [cardCreateModal, setCardCreateModal] = useState(false);

  return (
    <div>
      <Typography.Title level={5}>카드</Typography.Title>
      <Button
        type="primary"
        className={style.postCards}
        onClick={() => setCardCreateModal(true)}
      >
        등록
      </Button>
      <CreateCardForm
        cardCreateModal={cardCreateModal}
        setCardCreateModal={setCardCreateModal}
      />
    </div>
  );
};

const CardsCardList = ({ cards }) => (
  <div>
    {cards.map((card, index) => (
      <Typography.Text>{index}</Typography.Text>
    ))}
  </div>
);

const CardsCard = ({ cards }) => (
  <Card title={<CardsCardTitle />}>
    {cards.length === 0 ? '카드가 없습니다. 등록해주세요.' : <CardsCardList />}
  </Card>
);

export default CardsCard;

import { Button, Card, Flex, List, Space, Typography } from 'antd';

import React, { useState } from 'react';
import { CreditCardOutlined } from '@ant-design/icons';
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

const CardCard: React.FC = ({ card }) => (
  <Card>
    <Flex align="start" gap={24}>
      <CreditCardOutlined />
      <Space direction="horizontal" size="middle" />
      <Typography.Text strong>카드 번호: </Typography.Text>
      <Space direction="horizontal" size="middle" />
      <Typography.Text>
        {card.cardNumber
          .split('')
          .map((num, index) => (index <= 10 ? num : '*'))
          .join('')}
      </Typography.Text>
    </Flex>
  </Card>
);

const CardsCardList = ({ cards }) => (
  <div>
    <List gap={10}>
      {cards.map((card, index) => (
        <List.Item style={{ width: 'max-content' }} key={index}>
          <CardCard card={card} />
        </List.Item>
      ))}
    </List>
  </div>
);

const CardsCard = ({ cards }) => (
  <Card title={<CardsCardTitle />}>
    {cards.length === 0 ? (
      '카드가 없습니다. 등록해주세요.'
    ) : (
      <CardsCardList cards={cards} />
    )}
  </Card>
);

export default CardsCard;

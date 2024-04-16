import { Select } from 'antd';
import React from 'react';

import { UserCard } from '../../../../core/types/user.ts';

interface CardOptionsProps {
  cards: UserCard[];
}

export const CardOptions: React.FC<CardOptionsProps> = ({ cards }) => (
  <>
    {cards.map((card: UserCard) => (
      <Select.Option key={card.cardNumber} value={card.cardNumber}>
        {card.cardNickname}: {card.cardNumber}
      </Select.Option>
    ))}
  </>
);

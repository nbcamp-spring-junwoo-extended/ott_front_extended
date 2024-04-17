import { Form, Select } from 'antd';
import React from 'react';

import { UserCard } from '../../../../../core/types/user.ts';

type CardOptionsProps = {
  cards: UserCard[];
};

export const CardOptions: React.FC<CardOptionsProps> = ({ cards }) => (
  <Form.Item label="카드" name="card" rules={[{ required: true }]}>
    <Select placeholder={cards.length > 0 ? '카드를 선택 해주세요.' : '카드를 먼저 등록 해주세요'}>
      {cards.map((card: UserCard) => (
        <Select.Option key={card.cardNumber} value={card.cardNumber}>
          {card.cardNickname}: {card.cardNumber}
        </Select.Option>
      ))}
    </Select>
  </Form.Item>
);

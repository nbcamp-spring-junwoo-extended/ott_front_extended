import { Button, Flex, Form, Select, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { requestSubscription } from '../../../core/apis/subscriptionApi.ts';
import { myCards } from '../../../core/apis/userApi.ts';
import { RootState } from '../../../core/reducer/store.ts';
import { UserCard } from '../../../core/types/user.ts';
import style from './SubscribeCard.module.css';
import { CardOptions } from './components/CardOptionsProps.tsx';

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
    xs: { span: 24 },
  },
  wrapperCol: {
    sm: { span: 16 },
    xs: { span: 24 },
  },
};

type FormData = {
  card: string;
  coupon: string;
};

type SubscribeRequestFormProps = {
  membershipType: string;
  price: number;
};

const SubscribeRequestForm: React.FC<SubscribeRequestFormProps> = ({ membershipType, price }) => {
  const [cards, setCards] = useState<UserCard[]>([]);

  const userId = useSelector((state: RootState) => state.user.userId);
  const navigate = useNavigate();

  useEffect(() => {
    myCards().then((response) => {
      const responseCards: UserCard[] = response.data?.data;
      setCards(responseCards);
    });
  }, []);

  const handleOnFinish = (data: FormData) => {
    const selectedCard = cards.find((card) => card.cardNumber === data.card);
    if (!selectedCard) {
      message.error('카드를 선택해주세요.').then();
      return;
    }

    // TODO: implement coupons
    requestSubscription(userId, selectedCard.cardId, membershipType)
      .then(() => navigate('/profile'))
      .catch((error) => message.error(error.response.data.message));
  };

  return (
    <Form {...formItemLayout} onFinish={handleOnFinish}>
      <Form.Item label="멤버쉽">
        <Select disabled placeholder={<Typography.Text underline>{membershipType.slice(5)}</Typography.Text>} />
      </Form.Item>

      <Form.Item label="카드" name="card" rules={[{ required: true }]}>
        <Select placeholder={cards.length > 0 ? '카드를 선택 해주세요.' : '카드를 먼저 등록 해주세요'}>
          <CardOptions cards={cards} />
        </Select>
      </Form.Item>

      <Form.Item label="쿠폰" name="coupon">
        <Select placeholder="쿠폰을 선택 해주세요." />
      </Form.Item>

      <Flex align="baseline" justify="flex-end">
        <Typography.Title className={style.formTitle} level={5} underline>
          가격: {price}₩
        </Typography.Title>
        <Button htmlType="submit" type="primary">
          신청
        </Button>
      </Flex>
    </Form>
  );
};

export default SubscribeRequestForm;

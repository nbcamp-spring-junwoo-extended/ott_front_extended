import { Button, Flex, Form, Select, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { requestSubscription } from '../../../core/apis/subscriptionApi.ts';
import { myCards } from '../../../core/apis/userApi.ts';
import { UserCard } from '../../../core/reducer/cardSlice.ts';
import style from './SubscribeCard.module.css';

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

interface SubscribeRequestFormProps {
  SubscriptionInfo: {
    membershipType: string;
    price: number;
  };
}

const SubscribeRequestForm: React.FC<SubscribeRequestFormProps> = ({ SubscriptionInfo }) => {
  const userId = useSelector((state) => state.user.userId);
  const [cards, setCards] = useState<UserCard[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    myCards().then((response) => {
      const responseCards: UserCard[] = response.data?.data;
      setCards(responseCards);
    });
  }, []);

  const onSubscriptionRequest = (data) => {
    const { cardId } = cards.filter((card) => card.cardNumber === data.card)[0];
    // TODO: implement coupons
    requestSubscription(userId, cardId, SubscriptionInfo.membershipType)
      .then(() => {
        navigate('/profile');
      })
      .catch((error) => console.log(error));
  };

  const cardOptions = () => (
    <>
      {cards.map((card) => (
        <Select.Option key={card.cardNumber} value={card.cardNumber}>
          {card.cardNickname}: {card.cardNumber}
        </Select.Option>
      ))}
    </>
  );

  return (
    <Form {...formItemLayout} onFinish={onSubscriptionRequest}>
      <Form.Item label="멤버쉽">
        <Select
          disabled
          placeholder={
            <Typography.Text underline>
              {SubscriptionInfo?.membershipType?.slice(5)}
            </Typography.Text>
          }
        />
      </Form.Item>
      <Form.Item label="카드" name="card" rules={[{ required: true }]}>
        <Select
          placeholder={cards.length > 0 ? '카드를 선택 해주세요.' : '카드를 먼저 등록 해주세요'}
        >
          {cardOptions()}
        </Select>
      </Form.Item>

      <Form.Item label="쿠폰" name="coupon">
        <Select placeholder="쿠폰을 선택 해주세요." />
      </Form.Item>

      <Flex align="baseline" justify="flex-end">
        <Typography.Title className={style.formTitle} level={5} underline>
          가격: {SubscriptionInfo.price}₩
        </Typography.Title>
        <Button htmlType="submit" type="primary">
          신청
        </Button>
      </Flex>
    </Form>
  );
};

export default SubscribeRequestForm;

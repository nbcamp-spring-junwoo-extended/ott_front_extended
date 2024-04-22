import { Button, Flex, Form, Select, Typography, message } from 'antd';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { requestSubscription } from '../../../../../core/apis/subscriptionApi.ts';
import { RootState } from '../../../../../core/reducer/store.ts';
import { UserCard, UserCoupon } from '../../../../../core/types/user.ts';
import style from '../../SubscribeCard.module.css';
import { CardOptions } from './CardOptions.tsx';
import { CouponOptions } from './CouponOptions.tsx';
import { useSubscribeForm } from './SubscribeForm.hooks.ts';

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

export type SubscribeFromData = {
  card: string;
  coupon: string;
};

type SubscribeRequestFormProps = {
  membershipType: string;
  price: number;
  setIsConfirmLoading: (value: boolean) => void;
};

const SubscribeRequestForm: React.FC<SubscribeRequestFormProps> = ({ membershipType, price, setIsConfirmLoading }) => {
  const [cards, setCards] = useState<UserCard[]>([]);
  const [coupons, setCoupons] = useState<UserCoupon[]>([]);

  const userId = useSelector((state: RootState) => state.user.userId);
  const navigate = useNavigate();

  useSubscribeForm({ setCards, setCoupons });

  const handleOnfinish = (formData: SubscribeFromData) => {
    console.log(formData);
    const cardId = cards.find((card) => card.cardNumber === formData.card)?.cardId;
    const couponId = coupons.find((coupon) => coupon.couponId.toString() == formData.coupon)?.couponId;

    if (!cardId) {
      message.error('카드를 선택해주세요.').then();
    }

    setIsConfirmLoading(true);
    requestSubscription(userId, cardId!, membershipType, couponId)
      .then(() => navigate('/profile'))
      .catch((error) => message.error(error.response.data.message))
      .finally(() => setIsConfirmLoading(false));
  };

  return (
    <Form {...formItemLayout} onFinish={handleOnfinish}>
      <Form.Item label="멤버쉽">
        <Select disabled placeholder={<Typography.Text underline>{membershipType.slice(5)}</Typography.Text>} />
      </Form.Item>

      <CardOptions cards={cards} />

      <CouponOptions coupons={coupons.filter((c) => c.membershipType === membershipType)} />

      <Flex align="baseline" justify="flex-end">
        <Typography.Title className={style.formTitle} level={5} underline>
          가격: {new Intl.NumberFormat('ko', { currency: 'KRW', style: 'currency' }).format(price ?? 0)}
        </Typography.Title>
        <Button htmlType="submit" type="primary">
          신청
        </Button>
      </Flex>
    </Form>
  );
};

export default SubscribeRequestForm;

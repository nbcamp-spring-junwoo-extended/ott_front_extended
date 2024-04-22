import { Form, Select, Typography, message } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { requestSubscription } from '../../../../../core/apis/subscriptionApi.ts';
import { CardOptions } from './CardOptions.tsx';
import { CouponOptions } from './CouponOptions.tsx';
import SubscriptionFormFooter from './SubscriptionFormFooter.tsx';
import useSubscribeForm from './useSubscribeForm.ts';

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
  cardId: number;
  couponId: number;
};

type SubscribeRequestFormProps = {
  membershipType: string;
  price: number;
  setIsConfirmLoading: (value: boolean) => void;
};

const SubscribeRequestForm: React.FC<SubscribeRequestFormProps> = ({ membershipType, price, setIsConfirmLoading }) => {
  const {
    cards,
    coupons,
    userProfile: { userId },
  } = useSubscribeForm();
  const navigate = useNavigate();

  const [form] = Form.useForm<SubscribeFromData>();
  const watchCouponId = Form.useWatch('couponId', form);

  const handleOnfinish = ({ cardId, couponId }: SubscribeFromData) => {
    if (!cardId) {
      message.error('카드를 선택해주세요.').then();
    }

    setIsConfirmLoading(true);
    requestSubscription(userId, cardId, membershipType, couponId)
      .then(() => navigate('/profile'))
      .catch((error) => message.error(error.response.data.message))
      .finally(() => setIsConfirmLoading(false));
  };

  return (
    <Form {...formItemLayout} form={form} onFinish={handleOnfinish}>
      <Form.Item label="멤버쉽">
        <Select disabled placeholder={<Typography.Text underline>{membershipType.slice(5)}</Typography.Text>} />
      </Form.Item>

      <CardOptions cards={cards} />

      <CouponOptions coupons={coupons.filter((c) => c.membershipType === membershipType)} />

      <SubscriptionFormFooter coupon={coupons.find((c) => c.couponId === watchCouponId)} price={price} />
    </Form>
  );
};

export default SubscribeRequestForm;

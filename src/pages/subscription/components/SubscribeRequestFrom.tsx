import React from 'react';
import { Button, Flex, Form, Select, Typography } from 'antd';
import { useSelector } from 'react-redux';
import style from './SubscribeCard.module.css';
import { requestSubscription } from '../../../core/apis/subscriptionApi.ts';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

interface SubscribeRequestFormProps {
  SubscriptionInfo: {
    membershipType: string;
    price: number;
  };
  FormData: unknown;
}

const SubscribeRequestForm: React.FC<SubscribeRequestFormProps> = ({
  SubscriptionInfo,
}) => {
  const cards = useSelector((state) => state.card.cards);
  const userId = useSelector((state) => state.user.userId);

  const onSubscriptionRequest = (data) => {
    const { cardId } = cards.filter((card) => card.cardNumber === data.card)[0];
    // TODO
    requestSubscription(userId, cardId, SubscriptionInfo.membershipType)
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  };

  return (
    <Form {...formItemLayout} onFinish={onSubscriptionRequest}>
      <Form.Item label="멤버쉽">
        <Select
          placeholder={
            <Typography.Text underline>
              {SubscriptionInfo?.membershipType?.slice(5)}
            </Typography.Text>
          }
          disabled
        />
      </Form.Item>
      <Form.Item name="card" label="카드" rules={[{ required: true }]}>
        <Select placeholder="카드를 선택 해주세요.">
          {cards.map((card) => (
            <Select.Option key={card.cardNumber} value={card.cardNumber}>
              {card.cardNumber}
            </Select.Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="coupon" label="쿠폰">
        <Select placeholder="쿠폰을 선택 해주세요." />
      </Form.Item>

      <Flex align="baseline" justify="flex-end">
        <Typography.Title level={5} underline className={style.formTitle}>
          가격: {SubscriptionInfo.price}₩
        </Typography.Title>
        <Button type="primary" htmlType="submit">
          신청
        </Button>
      </Flex>
    </Form>
  );
};

export default SubscribeRequestForm;

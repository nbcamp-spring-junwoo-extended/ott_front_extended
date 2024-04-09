import React from 'react';
import { Form, Select, Typography } from 'antd';
import { useSelector } from 'react-redux';

import style from './SubscribeCard.module.css';

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

const MembershipTitle: React.FC = ({ membershipType }) => (
  <Typography.Text underline>{membershipType.slice(5)}</Typography.Text>
);

const SubscribeRequestForm: React.FC = ({ membershipType }) => {
  const cards = useSelector((state) => state.card.cards);
  const [form] = Form.useForm();

  return (
    <Form {...formItemLayout}>
      <Form.Item name="membership" label="멤버쉽" rules={[{ required: true }]}>
        <Select
          placeholder={
            <MembershipTitle membershipType={membershipType.membershipType} />
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

      <Typography.Title level={5} underline className={style.formTitle}>
        가격: {membershipType.price}₩
      </Typography.Title>
    </Form>
  );
};

export default SubscribeRequestForm;

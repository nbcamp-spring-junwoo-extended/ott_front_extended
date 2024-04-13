import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { Button, Card, Col, List, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import style from '../Profile.module.css';

const CLIENT_KEY = import.meta.env.VITE_TOSSPAYMENTS_CLIENTKEY;
const CUSTOMER_KEY = '12341234';

interface CardProps {
  cardNickname: string;
  cardNumber: string;
}

interface CardsCardProps {
  cards: CardProps[];
}

const usePaymentWidget = (clientKey: string) =>
  useQuery({
    queryFn: () =>
      // ------  결제위젯 초기화 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
      loadTossPayments(clientKey),
    queryKey: ['#payment-widget', clientKey],
  });

const CardsCardTitle: React.FC = () => {
  const { data: paymentSdk } = usePaymentWidget(CLIENT_KEY);
  const [isCreateCardVisible, setIsCreateCardVisible] = useState<boolean>(false);

  useEffect(() => {
    if (paymentSdk == null || !isCreateCardVisible) {
      return;
    }

    paymentSdk
      .requestBillingAuth('카드', {
        customerKey: CUSTOMER_KEY,
        failUrl: `${window.location.origin}/profile/card/fail`,
        successUrl: `${window.location.origin}/profile/newcard/success`,
      })
      .catch(() => setIsCreateCardVisible(false));
  }, [paymentSdk, isCreateCardVisible]);

  return (
    <div>
      <Typography.Title level={5}>카드</Typography.Title>
      <Button
        className={style.postCards}
        onClick={() => setIsCreateCardVisible(true)}
        type="primary"
      >
        등록
      </Button>
    </div>
  );
};

const CardsCard: React.FC<CardsCardProps> = ({ cards }) => (
  <Card title={<CardsCardTitle />}>
    <List
      bordered
      dataSource={cards}
      renderItem={(item) => (
        <List.Item>
          <Col span={4}>
            <Typography.Text>{item.cardNickname}</Typography.Text>
          </Col>
          <Col span={1}>:</Col>
          <Col span={15}>
            <Typography.Text>{item.cardNumber}</Typography.Text>
          </Col>
          <Col span={2}>
            {/* TODO: onClick event to modify card */}
            <EditOutlined onClick={() => alert('수정 버튼 미구현')} />
          </Col>
          <Col span={2}>
            {/* TODO: onClick event to delete card */}
            <DeleteOutlined onClick={() => alert('삭제 버튼 미구현')} style={{ color: 'red' }} />
          </Col>
        </List.Item>
      )}
    />
  </Card>
);

export default CardsCard;

import { Card, Divider, Typography } from 'antd';
import React, { useState } from 'react';

import { Payment } from '../../../core/types/payment.ts';
import style from './SubscribeCard.module.css';
import { SubscribeModal } from './components/SubscribeModal.tsx';

interface SubscribeCardProps {
  subscriptionInfo: Payment;
}

const SubscribeCard: React.FC<SubscribeCardProps> = ({ subscriptionInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    if (subscriptionInfo.price !== 0) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Card className={style.subscribeCard} onClick={handleCardClick} title={subscriptionInfo.membershipType.slice(5)}>
        <Typography.Title className={style.title} level={2}>
          {new Intl.NumberFormat('ko-KR', { currency: 'KRW', style: 'currency' }).format(subscriptionInfo.price)}
        </Typography.Title>
        <Divider />
        <Typography.Text>
          {subscriptionInfo.detail.split('#').map((data, index) => (
            <p key={index}>{`# ${data}`}</p>
          ))}
        </Typography.Text>
      </Card>

      <SubscribeModal onCancel={() => setIsModalOpen(false)} open={isModalOpen} subscriptionInfo={subscriptionInfo} />
    </>
  );
};

export default SubscribeCard;

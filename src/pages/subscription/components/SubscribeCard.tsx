import { Card, Divider, Modal, Typography } from 'antd';
import React, { useState } from 'react';

import { Payment } from '../../../core/types/payment.d.ts';
import style from './SubscribeCard.module.css';
import SubscribeRequestForm from './SubscribeRequestFrom.tsx';

interface SubscribeCardProps {
  subscriptionInfo: Payment;
}

const SubscribeCard: React.FC<SubscribeCardProps> = ({ subscriptionInfo }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onCardClick = () => {
    if (subscriptionInfo.price !== 0) {
      setIsModalVisible(true);
    }
  };

  return (
    <>
      <Card
        className={style.subscribeCard}
        onClick={onCardClick}
        title={subscriptionInfo.membershipType.slice(5)}
      >
        <Typography.Title className={style.title} level={2} strong>
          {new Intl.NumberFormat('ko-KR', { currency: 'KRW', style: 'currency' }).format(
            subscriptionInfo.price,
          )}
        </Typography.Title>
        <Divider />
        <Typography.Text>
          {subscriptionInfo.detail.split('#').map((data, index) => (
            <p key={index}>{`# ${data}`}</p>
          ))}
        </Typography.Text>
      </Card>
      <Modal
        cancelText="취소"
        centered="vertical"
        footer={[]}
        okText="신청"
        onCancel={() => setIsModalVisible(false)}
        open={isModalVisible}
        title="구독 신청"
      >
        <SubscribeRequestForm SubscriptionInfo={subscriptionInfo} />
      </Modal>
    </>
  );
};

export default SubscribeCard;

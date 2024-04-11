import React, { useState } from 'react';
import { Card, Divider, Modal, Typography } from 'antd';
import style from './SubscribeCard.module.css';
import SubscribeRequestForm from './SubscribeRequestFrom.tsx';

const SubscribeCard: React.FC = ({ subscriptionInfo }) => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  return (
    <>
      <Card
        title={subscriptionInfo.membershipType.slice(5)}
        bordered={false}
        onClick={() => {
          setIsModalVisible(true);
        }}
        className={style.subscribeCard}
      >
        <Typography.Title underline strong level={3} className={style.title}>
          {subscriptionInfo.price}₩
        </Typography.Title>
        <Divider />
        <Typography.Text>
          {subscriptionInfo.detail.split('#').map((data, index) => (
            <p key={index}>{`# ${data}`}</p>
          ))}
        </Typography.Text>
      </Card>
      <Modal
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        centered="vertical"
        title="구독 신청"
        cancelText="취소"
        okText="신청"
        footer={[]}
      >
        <SubscribeRequestForm SubscriptionInfo={subscriptionInfo} />
      </Modal>
    </>
  );
};

export default SubscribeCard;

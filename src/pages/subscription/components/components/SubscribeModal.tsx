import { Modal } from 'antd';
import React, { useState } from 'react';

import { Payment } from '../../../../core/types/payment.ts';
import SubscribeRequestForm from './components/SubscribeFrom.tsx';

type SubscriptionRequestModalProps = {
  onCancel: () => void;
  open: boolean;
  subscriptionInfo: Payment;
};

export const SubscribeModal: React.FC<SubscriptionRequestModalProps> = ({ onCancel, open, subscriptionInfo }) => {
  const [isConfirmLoading, setIsConfirmLoading] = useState(false);
  const { membershipType, price } = subscriptionInfo;

  return (
    <Modal
      cancelText="취소"
      centered
      confirmLoading={isConfirmLoading}
      footer={null}
      okText="신청"
      onCancel={onCancel}
      open={open}
      title="구독 신청"
    >
      <SubscribeRequestForm membershipType={membershipType} price={price} setIsConfirmLoading={setIsConfirmLoading} />
    </Modal>
  );
};

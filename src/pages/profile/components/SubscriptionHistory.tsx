import { Card, List } from 'antd';
import React from 'react';

import { useFetchSubscriptionHistory } from '../../../hooks/user/useFetchSubscriptionHistory.ts';
import SubscriptionHistoryItem from './components/SubscriptionHistoryItem.tsx';

export const SubscriptionHistory: React.FC = () => {
  const { isLoading, subscriptionHistories } = useFetchSubscriptionHistory();

  return (
    <Card loading={isLoading} title="구독 기록">
      <List
        bordered
        dataSource={subscriptionHistories}
        renderItem={({ expireAt, membershipType: type, orderId, startAt }) => (
          <SubscriptionHistoryItem expireAt={expireAt} orderId={orderId} startAt={startAt} type={type} />
        )}
      />
    </Card>
  );
};

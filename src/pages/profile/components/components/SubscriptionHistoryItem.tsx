import { ContainerOutlined } from '@ant-design/icons';
import { List, Typography } from 'antd';
import React, { useState } from 'react';

import { DateArray } from '../../../../core/types/common.ts';
import { MembershipType } from '../../../../core/types/user.ts';
import { calculateRemainingDays, dateArrayToString } from '../../../../utils/dateUtils.ts';
import SubscriptionOrderHistory from './SubscriptionOrderHistory.tsx';

type SubscriptionHistoryItemProps = {
  expireAt: DateArray;
  orderId: string;
  startAt: DateArray;
  type: MembershipType;
};

const SubscriptionHistoryItem: React.FC<SubscriptionHistoryItemProps> = ({ expireAt, orderId, startAt, type }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <List.Item>
      <List.Item.Meta
        avatar={<Typography.Text style={{ fontWeight: 'bolder' }}>{type.slice(5)}</Typography.Text>}
        description={
          <Typography.Text style={{ display: 'flex', margin: '0 auto', textAlign: 'start' }}>
            {dateArrayToString(expireAt)} ~ {dateArrayToString(startAt)}
          </Typography.Text>
        }
        title={
          <Typography.Paragraph style={{ textAlign: 'start' }}>{calculateRemainingDays(expireAt)}</Typography.Paragraph>
        }
      />
      <ContainerOutlined onClick={() => setIsModalOpen(true)} style={{ fontSize: 'x-large' }} />
      {isModalOpen && <SubscriptionOrderHistory orderId={orderId} stateOpen={{ isModalOpen, setIsModalOpen }} />}
    </List.Item>
  );
};

export default SubscriptionHistoryItem;

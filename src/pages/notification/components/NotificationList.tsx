import { List } from 'antd';
import React from 'react';

import NotificationItem from './NotificationItem.tsx';
import { useNotificationList } from './NotificationList.hooks.ts';

const NotificationList: React.FC = () => {
  const { isLoading, notifications } = useNotificationList();

  return (
    <List
      dataSource={notifications}
      loading={isLoading}
      renderItem={(notification) => <NotificationItem key={notification.announcementId} notification={notification} />}
      size="large"
    />
  );
};

export default NotificationList;

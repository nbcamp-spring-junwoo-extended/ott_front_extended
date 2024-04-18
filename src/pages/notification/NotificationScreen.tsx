import { Card, Typography } from 'antd';
import React from 'react';

import NotificationList from './components/NotificationList.tsx';

const NotificationScreen: React.FC = () => (
  <Card title={<Typography.Title>🔔 공지사항</Typography.Title>}>
    <NotificationList />
  </Card>
);

export default NotificationScreen;

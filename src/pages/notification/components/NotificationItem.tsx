import { AccountBookOutlined } from '@ant-design/icons';
import { List, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { Notification } from '../../../core/types/notification.ts';
import styles from './Notification.module.css';

type NotificationItemProps = {
  notification: Notification;
};

const NotificationItem: React.FC<NotificationItemProps> = ({ notification }) => {
  const { announcementId, title } = notification;

  const navigate = useNavigate();

  const handleOnClick = () => {
    navigate(`/notification/${announcementId}`);
  };

  return (
    <List.Item className={styles.notificationItem} onClick={handleOnClick}>
      <List.Item.Meta
        avatar={<AccountBookOutlined style={{ fontSize: 30 }} />}
        title={
          <Typography.Paragraph style={{ display: 'flex', margin: 0, textAlign: 'start' }}>
            {title}
          </Typography.Paragraph>
        }
      />
    </List.Item>
  );
};

export default NotificationItem;

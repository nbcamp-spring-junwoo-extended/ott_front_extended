import { Typography } from 'antd';
import React from 'react';

type NotificationDetailsTitleProps = {
  title: string;
};

const NotificationDetailsTitle: React.FC<NotificationDetailsTitleProps> = ({ title }) => (
  <Typography.Title>{title}</Typography.Title>
);

export default NotificationDetailsTitle;

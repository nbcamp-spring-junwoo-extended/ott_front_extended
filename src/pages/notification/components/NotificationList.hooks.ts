import { message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { getNotifications } from '../../../core/apis/notificationApi.ts';
import { Notification } from '../../../core/types/notification.ts';

export const useNotificationList = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    const fetchNotifications = async () => {
      setIsLoading(true);
      try {
        const response = await getNotifications();
        const responseNotifications = response.data.data.content;
        setNotifications(responseNotifications);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          message.error(error.message);
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotifications().then();
  }, []);

  return { isLoading, notifications };
};

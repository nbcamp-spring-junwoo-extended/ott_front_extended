import { message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getNotification } from '../../core/apis/notificationApi.ts';
import { NotificationDetails } from '../../core/types/notification.ts';

export const useNotificationDetailsScreen = () => {
  const { id: notificationId } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationDetails>({} as NotificationDetails);

  useEffect(() => {
    setIsLoading(true);

    if (!notificationId) {
      message.error('공지사항 ID가 없습니다.');
    }

    const fetchNotification = async () => {
      try {
        const response = await getNotification(Number(notificationId));
        const responseNotification = response.data.data;
        setNotification(responseNotification);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          message.error(error.message);
        }
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchNotification().then();
  }, [notificationId]);

  return { isLoading, notification };
};

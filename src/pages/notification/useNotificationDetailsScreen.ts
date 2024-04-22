import { message } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { getNotification } from '../../core/apis/notificationApi.ts';
import { NotificationDetails } from '../../core/types/notification.ts';

export const useNotificationDetailsScreen = () => {
  const { id: notificationId } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [notification, setNotification] = useState<NotificationDetails>({} as NotificationDetails);

  const fetchNotification = useCallback(async () => {
    setIsLoading(true);

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
  }, [notificationId]);

  useEffect(() => {
    if (!notificationId) {
      message.error('공지사항 ID가 없습니다.');
    }

    fetchNotification().then();
  }, [fetchNotification]);

  return { isLoading, notification };
};

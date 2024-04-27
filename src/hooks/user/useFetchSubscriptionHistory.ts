import { message } from 'antd';
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { mySubscriptionHistories } from '../../core/apis/userApi.ts';
import { UserSubscriptionHistory } from '../../core/types/user.ts';

export const useFetchSubscriptionHistory = () => {
  const [subscriptionHistories, setSubscriptionHistories] = useState<UserSubscriptionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchSubscriptionHistory = async () => {
      abortController?.current?.abort();
      abortController.current = new AbortController();

      setIsLoading(true);
      try {
        const response = await mySubscriptionHistories(abortController.current?.signal);
        setSubscriptionHistories(response.data.data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          message.error(e?.response?.data?.message ?? e?.message ?? '알 수 없는 오류가 발생했습니다.');
        }
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionHistory().then();
  }, []);

  return { isLoading, subscriptionHistories };
};

import { useEffect, useRef, useState } from 'react';

import { mySubscriptionHistories } from '../../core/apis/userApi.ts';
import { UserSubscriptionHistory } from '../../core/types/user.ts';
import { notifyIfAxiosError } from '../../utils/axiosUtils.ts';

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
        notifyIfAxiosError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSubscriptionHistory().then();
  }, []);

  return { isLoading, subscriptionHistories };
};

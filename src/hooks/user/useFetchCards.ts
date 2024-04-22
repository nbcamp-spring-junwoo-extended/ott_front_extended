import { message } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { myCards } from '../../core/apis/userApi.ts';
import { UserCard } from '../../core/types/user.ts';

export const useFetchCards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<UserCard[]>([]);

  const fetchProfileAndCards = useCallback(async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await myCards();
      const responseCards = response.data.data;
      setCards(responseCards);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error(e.response?.data?.message || e.message);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileAndCards().then();
  }, [fetchProfileAndCards]);

  return { cards, isLoading };
};

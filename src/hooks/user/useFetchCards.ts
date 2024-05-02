import { useCallback, useEffect, useRef, useState } from 'react';

import { myCards } from '../../core/apis/userApi.ts';
import { UserCard } from '../../core/types/user.ts';
import { notifyIfAxiosError } from '../../utils/axiosUtils.ts';

export const useFetchCards = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [cards, setCards] = useState<UserCard[]>([]);

  const abortController = useRef<AbortController | null>(null);
  const fetchProfileAndCards = useCallback(async () => {
    abortController?.current?.abort();
    abortController.current = new AbortController();
    const { signal } = abortController.current;

    setIsLoading(true);
    try {
      const response = await myCards(signal);
      setCards(response.data.data);
    } catch (e) {
      notifyIfAxiosError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProfileAndCards().then();
  }, [fetchProfileAndCards]);

  return { cards, isLoading };
};

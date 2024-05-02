import { useEffect, useRef, useState } from 'react';

import { getLike } from '../../core/apis/videoApi.ts';
import { notifyIfAxiosError } from '../../utils/axiosUtils.ts';

export const useFetchIsLiked = (id: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isLikedVideo, setIsLikedVideo] = useState(false);

  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    const fetchLike = async () => {
      abortController?.current?.abort();
      abortController.current = new AbortController();
      const { signal } = abortController.current;

      setIsLoading(true);
      try {
        const response = await getLike(Number(id), signal);
        setIsLikedVideo(response.data.data);
      } catch (e) {
        notifyIfAxiosError(e as Error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLike().then();
  }, [id]);

  return { isLikedVideo, isLoading, setIsLikedVideo };
};

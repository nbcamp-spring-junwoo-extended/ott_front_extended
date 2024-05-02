import { Dispatch, SetStateAction, useCallback, useRef, useState } from 'react';

import { toggleLike } from '../../core/apis/videoApi.ts';
import { notifyIfAxiosError } from '../../utils/axiosUtils.ts';

export const useToggleLike = (id: string, setIsLikedVideo: Dispatch<SetStateAction<boolean>>) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const abortController = useRef<AbortController | null>(null);

  const onLikeClick = useCallback(async () => {
    abortController?.current?.abort();
    abortController.current = new AbortController();
    const { signal } = abortController.current;

    try {
      await toggleLike(Number(id), signal);
      setIsLikedVideo((prev) => !prev);
    } catch (e) {
      notifyIfAxiosError(e as Error);
    } finally {
      setIsSubmitting(false);
    }
  }, [id, setIsLikedVideo]);

  return { isSubmitting, onLikeVideo: onLikeClick };
};

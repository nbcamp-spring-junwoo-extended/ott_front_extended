import { useCallback, useEffect, useRef, useState } from 'react';

import { getRandomVideos } from '../../core/apis/videoApi.ts';
import { VideoRandomSearchDto } from '../../core/types/video.ts';
import { notifyIfAxiosError } from '../../utils/axiosUtils.ts';

export const useFetchRandomVideos = () => {
  const [videos, setVideos] = useState<VideoRandomSearchDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const abortController = useRef<AbortController | null>(null);

  const fetchRandomVideos = useCallback(async () => {
    abortController?.current?.abort();
    abortController.current = new AbortController();
    const { signal } = abortController.current;

    setIsLoading(true);
    try {
      const response = await getRandomVideos(signal);
      setVideos(response.data.data.videos);
    } catch (e) {
      notifyIfAxiosError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomVideos().then();
  }, [fetchRandomVideos]);

  return { isLoading, reFetch: fetchRandomVideos, videos };
};

import { useCallback, useEffect, useRef, useState } from 'react';

import { getVideoRanking } from '../../core/apis/videoApi.ts';
import { ChartResponseDto } from '../../core/types/video.ts';
import { notifyIfAxiosError } from '../../utils/axiosUtils.ts';

const useFetchRankingVideos = () => {
  const [videos, setVideos] = useState<ChartResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const abortController = useRef<AbortController | null>(null);
  const fetchVideos = useCallback(async () => {
    abortController?.current?.abort();
    abortController.current = new AbortController();
    const { signal } = abortController.current;

    setIsLoading(true);
    try {
      const response = await getVideoRanking(signal);
      setVideos(response.data.data);
    } catch (e) {
      notifyIfAxiosError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos().then();
  }, [fetchVideos]);

  return { isLoading, videos };
};

export default useFetchRankingVideos;

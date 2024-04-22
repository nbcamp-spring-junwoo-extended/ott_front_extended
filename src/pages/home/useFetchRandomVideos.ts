import { useCallback, useEffect, useState } from 'react';

import { getRandomVideos } from '../../core/apis/videoApi.ts';
import { VideoRandomSearchDto } from '../../core/types/video.ts';

export const useFetchRandomVideos = () => {
  const [videos, setVideos] = useState<VideoRandomSearchDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomVideos = useCallback(async () => {
    try {
      const response = await getRandomVideos();
      setVideos(response.data.data.videos);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomVideos().then();
  }, [fetchRandomVideos]);

  return { isLoading, reFetch: fetchRandomVideos, videos };
};

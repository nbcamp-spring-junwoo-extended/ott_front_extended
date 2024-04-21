import { useCallback, useEffect, useState } from 'react';

import { getRandomVideos } from '../../core/apis/videoApi.ts';
import { VideoSearchDto } from '../../core/types/video.ts';

export const useFetchRandomVideos = () => {
  const [videos, setVideos] = useState<VideoSearchDto[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchRandomVideos = useCallback(async () => {
    try {
      const response = await getRandomVideos();
      setVideos(response.data.data.videoReadResponseDtoList);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRandomVideos().then();
  }, [fetchRandomVideos]);

  return { isLoading, reFetch: fetchRandomVideos, videos };
};

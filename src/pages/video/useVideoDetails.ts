import { useCallback, useEffect, useState } from 'react';

import { getVideo } from '../../core/apis/videoApi.ts';
import { VideoDetailsResponse } from '../../core/types/video.ts';
import { notifyIfAxiosError } from '../../utils/axiosUtils.ts';

export const useVideoDetails = (id: string) => {
  const [videoDetails, setVideoDetails] = useState<VideoDetailsResponse>({} as VideoDetailsResponse);
  const [isCardLoading, setIsCardLoading] = useState(false);

  const fetchVideoDetails = useCallback(async () => {
    setIsCardLoading(true);

    try {
      const response = await getVideo(Number(id));
      setVideoDetails(response.data.data);
    } catch (e) {
      notifyIfAxiosError(e as Error);
    } finally {
      setIsCardLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchVideoDetails().then();
  }, [fetchVideoDetails]);

  return { isCardLoading, videoDetails };
};

import { message } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { getVideo } from '../../core/apis/videoApi.ts';
import { VideoDetailsResponse } from '../../core/types/video.ts';

export const useVideoDetails = (id: string) => {
  const [videoDetails, setVideoDetails] = useState<VideoDetailsResponse | null>(null);
  const [isCardLoading, setIsCardLoading] = useState(false);

  const fetchVideoDetails = useCallback(async () => {
    setIsCardLoading(true);

    try {
      const response = await getVideo(Number(id));
      setVideoDetails(response.data.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error(e.response?.data.message || e.message || '에러가 발생했습니다.');
      }
      console.error(e);
    } finally {
      setIsCardLoading(false);
    }
  }, [id]);

  useEffect(() => {
    if (!id) {
      return;
    }
    fetchVideoDetails().then();
  }, [fetchVideoDetails]);

  return { isCardLoading, videoDetails };
};

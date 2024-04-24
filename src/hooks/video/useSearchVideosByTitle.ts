import { message } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';

import { searchVideosByTitle } from '../../core/apis/videoApi.ts';
import { Page } from '../../core/types/common.ts';
import { VideoResponseDto } from '../../core/types/video.ts';

const useSearchVideosByTitle = (searchTerm: string, page: number = 0) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pagedVideos, setPagedVideos] = useState<Page<VideoResponseDto>>({} as Page<VideoResponseDto>);

  const abortController = useRef<AbortController | null>(null);

  const fetchVideos = useCallback(
    async (term: string) => {
      abortController.current?.abort();
      abortController.current = new AbortController();

      setIsLoading(true);
      try {
        const response = await searchVideosByTitle(term, page, abortController.current?.signal);
        setPagedVideos(response.data.data);
      } catch (e) {
        if (axios.isAxiosError(e))
          message.error(e.response?.data.message || e.message || '검색 중 오류가 발생했습니다.');
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    },
    [page],
  );

  useEffect(() => {
    if (!searchTerm) return;

    fetchVideos(searchTerm).then();
  }, [fetchVideos]);

  return { isSearching: isLoading, onSearch: fetchVideos, pagedVideos };
};

export default useSearchVideosByTitle;

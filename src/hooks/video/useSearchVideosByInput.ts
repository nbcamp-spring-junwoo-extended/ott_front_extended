import { message } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { searchVideosByInput } from '../../core/apis/videoApi.ts';
import { Page } from '../../core/types/common.ts';
import { SearchType } from '../../core/types/search.ts';
import { VideoResponseDto } from '../../core/types/video.ts';

const useSearchVideosByInput = (searchTerm: string, type: SearchType, page: number = 0) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pagedVideos, setPagedVideos] = useState<Page<VideoResponseDto>>({} as Page<VideoResponseDto>);
  const [, setSearchParams] = useSearchParams();

  const abortController = useRef<AbortController | null>(null);

  const fetchVideos = useCallback(
    async (term: string) => {
      abortController.current?.abort();
      abortController.current = new AbortController();

      setSearchParams({ page: page?.toString(), term, type });

      setIsLoading(true);
      try {
        const response = await searchVideosByInput(term, page, type, abortController.current?.signal);
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

export default useSearchVideosByInput;

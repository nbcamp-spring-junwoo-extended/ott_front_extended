import { message } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { searchVideosByGenre } from '../../core/apis/videoApi.ts';
import { Page } from '../../core/types/common.ts';
import { GenreLabel, OperationLabel } from '../../core/types/search.ts';
import { VideoResponseDto } from '../../core/types/video.ts';

export const useSearchVideosByGenre = (operation: OperationLabel = '또는', genres: GenreLabel[] = []) => {
  const [isLoading, setIsLoading] = useState(false);
  const [pagedVideos, setPagedVideos] = useState<Page<VideoResponseDto>>({} as Page<VideoResponseDto>);

  const fetchVideos = useCallback(async (operationParam: OperationLabel, genresParam: GenreLabel[], page = 0) => {
    setIsLoading(true);
    try {
      const response = await searchVideosByGenre(operationParam, genresParam, page);
      setPagedVideos(response.data.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error(e.response?.data.message || e?.message || '영상을 검색하는 도중 오류가 발생했습니다.');
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchVideos(operation, genres).then();
  }, [fetchVideos]);

  return { isLoading, onSearch: fetchVideos, pagedVideos };
};

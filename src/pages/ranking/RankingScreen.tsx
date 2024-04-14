import { List, message } from 'antd';
import React, { useEffect, useState } from 'react';

import { getRankingVideos } from '../../core/apis/videoApi.ts';
import { VideoReadResponse } from '../../core/types/video';

const RankingScreen: React.FC = () => {
  const [videos, setVideos] = useState<VideoReadResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        // 비디오 목록을 불러오는 API 호출
        const response = await getRankingVideos();
        const data = await response?.data;
        console.log(data);
        setVideos(data);
      } catch (error) {
        message.open({
          content: '비디오 목록을 불러오는 중 문제가 발생했습니다.',
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  return (
    <List
      bordered
      header="랭킹화면"
      itemLayout="vertical"
      itemsource={videos}
      loading={isLoading}
      renderItem={(video) => {
        <RankingVideoListItem video={video} />;
      }}
      size="large"
    />
  );
};

export default RankingScreen;

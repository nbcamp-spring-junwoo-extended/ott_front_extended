import { List, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';

import { getRankingVideos } from '../../core/apis/videoApi.ts';
import { RankingReadResponse } from '../../core/types/video';
import RankingVideoListItem from './components/RankingVideoListItem.tsx';

const RankingScreen: React.FC = () => {
  const [videos, setVideos] = useState<RankingReadResponse[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        // 비디오 목록을 불러오는 API 호출
        const response = await getRankingVideos();
        const data: RankingReadResponse[] = await response?.data;
        setVideos(data);
        console.log(data[0]);
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
      dataSource={videos}
      header={<Typography.Title level={3}>📈 랭킹</Typography.Title>}
      itemLayout="vertical"
      loading={isLoading}
      renderItem={(video, index) => <RankingVideoListItem rank={index + 1} video={video} />}
      size="large"
    />
  );
};

export default RankingScreen;

import { Card, List, Typography, message } from 'antd';
import React, { useEffect, useState } from 'react';

import { getRankingVideos } from '../../core/apis/videoApi.ts';
import { ChartResponseDto } from '../../core/types/video.ts';
import RankingVideoListItem from './components/RankingVideoListItem.tsx';

const RankingScreen: React.FC = () => {
  const [videos, setVideos] = useState<ChartResponseDto[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchVideos = async () => {
      setIsLoading(true);
      try {
        const response = await getRankingVideos();
        const responseVideos: ChartResponseDto[] = response.data.data;
        setVideos(responseVideos);
      } catch (error) {
        message.open({
          content: '비디오 목록을 불러오는 중 문제가 발생했습니다.',
          type: 'error',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos().then();
  }, []);

  return (
    <Card title={<Typography.Title>📈 랭킹</Typography.Title>}>
      <List
        bordered
        dataSource={videos}
        itemLayout="vertical"
        loading={isLoading}
        renderItem={(video, index) => <RankingVideoListItem rank={index + 1} video={video} />}
        size="large"
      />
    </Card>
  );
};

export default RankingScreen;

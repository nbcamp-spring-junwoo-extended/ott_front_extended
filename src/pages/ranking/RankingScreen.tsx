import { Card, List, Typography } from 'antd';
import React from 'react';

import useFetchRankingVideos from '../../hooks/video/useFetchRankingVideos.ts';
import RankingVideoListItem from './components/RankingVideoListItem.tsx';

const RankingScreen: React.FC = () => {
  const { isLoading, videos } = useFetchRankingVideos();

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

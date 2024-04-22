import { Card, List, Typography } from 'antd';
import React from 'react';

import RankingVideoListItem from './components/RankingVideoListItem.tsx';
import useFetchRankingVideos from './useFetchRankingVideos.ts';

const RankingScreen: React.FC = () => {
  const { isLoading, videos } = useFetchRankingVideos();
  console.table(videos);

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

import { Card, Typography } from 'antd';
import React from 'react';

import styles from './Deck.module.css';
import Deck from './Deck.tsx';
import { useFetchRandomVideos } from './useFetchRandomVideos.ts';

const HomeScreen: React.FC = () => {
  const { reFetch, videos } = useFetchRandomVideos();

  return (
    <Card classNames={{ body: styles.cardBody }} title={<Typography.Title>🔔 홈</Typography.Title>}>
      <Card.Meta description={<Deck key={videos[0]?.video_id} reFetch={reFetch} videos={videos} />} />
    </Card>
  );
};

export default HomeScreen;

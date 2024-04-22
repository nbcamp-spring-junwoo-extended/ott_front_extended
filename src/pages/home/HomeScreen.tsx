import { Card, Typography } from 'antd';
import React from 'react';

import { useFetchRandomVideos } from '../../hooks/video/useFetchRandomVideos.ts';
import styles from './Deck.module.css';
import Deck from './Deck.tsx';

const HomeScreen: React.FC = () => {
  const { reFetch, videos } = useFetchRandomVideos();

  return (
    <Card classNames={{ body: styles.cardBody }} title={<Typography.Title>🔔 홈</Typography.Title>}>
      <Card.Meta description={<Deck key={videos[0]?.videoId} reFetch={reFetch} videos={videos} />} />
    </Card>
  );
};

export default HomeScreen;

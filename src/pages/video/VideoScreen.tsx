import { Card, Col, Image, Row, Typography } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

import { FALLBACK_IMAGE } from '../../constants/global.ts';
import EpisodeList from './components/EpisodeList.tsx';
import { useVideoDetails } from './useVideoDetails.ts';

const VideoScreen: React.FC = () => {
  const { id } = useParams();
  const { isCardLoading, videoDetails } = useVideoDetails(id ?? '');

  return (
    videoDetails && (
      <Card
        loading={isCardLoading}
        style={{ minHeight: '60vh' }}
        title={<Typography.Title level={2}>{videoDetails.title}</Typography.Title>}
      >
        <Row gutter={[8, 24]} justify="center">
          <Col md={8} xl={6} xs={12}>
            <Card
              bordered={false}
              cover={<Image fallback={FALLBACK_IMAGE} preview={false} src={videoDetails.posterUrl} />}
            >
              <Card.Meta title={videoDetails.releasedAt} />
            </Card>
          </Col>
          <Col md={16} style={{ display: 'flex' }} xl={18} xs={24}>
            <Card bordered={false}>{videoDetails.description}</Card>
          </Col>
        </Row>
        <EpisodeList videoDetails={videoDetails} />
      </Card>
    )
  );
};

export default VideoScreen;

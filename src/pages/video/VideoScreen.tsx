import { HeartFilled, HeartOutlined } from '@ant-design/icons';
import { Button, Card, Col, Flex, Image, Row, Typography } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

import { FALLBACK_IMAGE } from '../../constants/global.ts';
import { useFetchIsLiked } from '../../hooks/video/useFetchIsLiked.ts';
import { useToggleLike } from '../../hooks/video/useToggleLike.ts';
import { dateArrayToString } from '../../utils/dateUtils.ts';
import { genreToKor } from '../../utils/videoUtils.ts';
import EpisodeList from './components/EpisodeList.tsx';
import { useVideoDetails } from './useVideoDetails.ts';

const VideoScreen: React.FC = () => {
  const { id } = useParams() as { id: string };
  const { isCardLoading, videoDetails } = useVideoDetails(id);
  const { isLikedVideo, isLoading: isLikedLoading, setIsLikedVideo } = useFetchIsLiked(id);
  const { isSubmitting, onLikeVideo: onLikeClick } = useToggleLike(id, setIsLikedVideo);
  const { description, genreTypeList, posterUrl, releasedAt, title } = videoDetails;
  const genreString = genreTypeList?.map(genreToKor).join(', ');

  return (
    videoDetails && (
      <Card
        loading={isCardLoading}
        style={{ minHeight: '60vh' }}
        title={<Typography.Title level={2}>{title}</Typography.Title>}
      >
        <Row gutter={[8, 24]} justify="center">
          <Col md={8} xl={6} xs={12}>
            <Card bordered={false} cover={<Image fallback={FALLBACK_IMAGE} preview={false} src={posterUrl} />}>
              <Card.Meta title={dateArrayToString(releasedAt)} />
            </Card>
          </Col>

          <Col md={16} style={{ display: 'flex' }} xl={18} xs={24}>
            <Card
              bordered={false}
              title={
                <Flex justify="space-between">
                  <Typography.Paragraph style={{ textAlign: 'start' }}>{genreString}</Typography.Paragraph>
                  <Button
                    icon={isLikedVideo ? <HeartFilled /> : <HeartOutlined />}
                    loading={isLikedLoading || isSubmitting}
                    onClick={onLikeClick}
                    type="primary"
                  />
                </Flex>
              }
            >
              <Typography.Paragraph style={{ textAlign: 'start' }}>{description}</Typography.Paragraph>
            </Card>
          </Col>
        </Row>
        <EpisodeList videoDetails={videoDetails} />
      </Card>
    )
  );
};

export default VideoScreen;

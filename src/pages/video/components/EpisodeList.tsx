import { Image, List, Typography } from 'antd';
import React from 'react';

import { Episode, VideoDetailsResponse } from '../../../core/types/video';
import { videoUrlToThumbnailURl } from '../../../utils/youtubeUtil.ts';
import styles from './EpisodeList.module.css';

interface EpisodeListProps {
  videoDetails: VideoDetailsResponse;
}

interface EpisodeListItemProps {
  episode: Episode;
}

const EpisodeListItem: React.FC<EpisodeListItemProps> = ({ episode }) => {
  console.table(episode);
  return (
    <List.Item className={styles.episodeListITem}>
      <List.Item.Meta
        avatar={
          <Image
            preview={false}
            src={videoUrlToThumbnailURl(episode.episodeUrl)}
            style={{ height: 200 }}
          />
        }
        description={<Typography.Paragraph>{episode.description}</Typography.Paragraph>}
        onClick={() => window.open(episode.episodeUrl, '_blank')}
        style={{ textAlign: 'left' }}
        title={<Typography.Title level={3}>{episode.title}</Typography.Title>}
      />
    </List.Item>
  );
};

const EpisodeList: React.FC<EpisodeListProps> = ({ videoDetails }) => (
  <List
    dataSource={videoDetails.episodeResponseDtoPage.content}
    header={<Typography.Title level={3}>에피소드 목록</Typography.Title>}
    itemLayout="vertical"
    renderItem={(episode: Episode) => <EpisodeListItem episode={episode} />}
    size="large"
  />
);

export default EpisodeList;

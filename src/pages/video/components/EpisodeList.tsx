import { Image, List, Typography } from 'antd';
import React from 'react';

import { Episode, VideoDetailsResponse } from '../../../core/types/video';

interface EpisodeListProps {
  videoDetails: VideoDetailsResponse;
}

interface EpisodeListItemProps {
  episode: Episode;
}

const EpisodeListItem: React.FC<EpisodeListItemProps> = ({ episode }) => (
  <List.Item>
    <List.Item.Meta
      avatar={<Image src={episode} />}
      description={episode.description}
      title={episode.title}
    />
  </List.Item>
);

const EpisodeList: React.FC<EpisodeListProps> = ({ videoDetails }) => (
  <List
    dataSource={videoDetails.episodeResponseDtoPage.content}
    header={<Typography.Title level={5}>에피소드 목록</Typography.Title>}
    itemLayout="vertical"
    renderItem={(episode: Episode) => <EpisodeListItem episode={episode} />}
    size="large"
  />
);

export default EpisodeList;

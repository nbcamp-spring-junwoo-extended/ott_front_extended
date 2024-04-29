import { List, Typography } from 'antd';
import React from 'react';

import { Episode, VideoDetailsResponse } from '../../../core/types/video.ts';
import { EpisodeListItem } from './components/EpisodeListItem.tsx';

interface EpisodeListProps {
  videoDetails: VideoDetailsResponse;
}

const EpisodeList: React.FC<EpisodeListProps> = ({ videoDetails }) => (
  <List
    dataSource={videoDetails?.episodeResponseDtoPage?.content}
    header={<Typography.Title level={3}>에피소드 목록</Typography.Title>}
    itemLayout="vertical"
    renderItem={(episode: Episode) => <EpisodeListItem episode={episode} />}
    size="large"
  />
);

export default EpisodeList;

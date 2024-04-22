import { Image, List, Typography } from 'antd';
import React from 'react';

import { Episode } from '../../../../core/types/video.ts';
import { videoUrlToThumbnailURl } from '../../../../utils/youtubeUtils.ts';
import styles from '../EpisodeList.module.css';

type EpisodeListItemProps = {
  episode: Episode;
};

export const EpisodeListItem: React.FC<EpisodeListItemProps> = ({ episode }) => {
  const handleClick = (e: Episode) => () => window.open(e.episodeUrl, '_blank');

  return (
    <List.Item className={styles.episodeListITem} onClick={handleClick(episode)}>
      <List.Item.Meta
        avatar={<Image preview={false} src={videoUrlToThumbnailURl(episode.episodeUrl)} style={{ height: 200 }} />}
        description={<Typography.Paragraph>{episode.description}</Typography.Paragraph>}
        style={{ textAlign: 'left' }}
        title={<Typography.Title level={3}>{episode.title}</Typography.Title>}
      />
    </List.Item>
  );
};

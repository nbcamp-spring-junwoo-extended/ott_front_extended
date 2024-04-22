import { Image, List, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { ChartResponseDto } from '../../../core/types/video.ts';

interface RankingVideoListItemProps {
  rank: number;
  video: ChartResponseDto;
}

const RankingVideoListItem: React.FC<RankingVideoListItemProps> = ({ rank, video }) => {
  const navigate = useNavigate();
  const handleOnClick = () => {
    navigate(`/videos/${video.videoId}`);
  };

  return (
    <List.Item
      extra={<Image height={280} preview={false} src={video.posterUrl} />}
      key={video.videoId}
      onClick={handleOnClick}
      style={{ cursor: 'pointer' }}
    >
      <List.Item.Meta
        avatar={<Typography.Title style={{ display: 'flex', margin: 'auto' }}>{rank}.</Typography.Title>}
        description={
          <Typography.Paragraph style={{ textAlign: 'start' }}>{video.videoDescription}</Typography.Paragraph>
        }
        title={
          <Typography.Text style={{ display: 'flex', fontSize: 'xx-large', textAlign: 'start' }}>
            {video.videoTitle}
          </Typography.Text>
        }
      />
    </List.Item>
  );
};

export default RankingVideoListItem;

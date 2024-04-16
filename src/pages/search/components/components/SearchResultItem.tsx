import { Card, Image, List, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { FALLBACK_IMAGE } from '../../../../constants/global.ts';
import { VideoSearchDto } from '../../../../core/types/video.ts';
import styles from '../SearchResultList.module.css';

interface SearchResultItemProps {
  item: VideoSearchDto;
}

const SearchResultItem: React.FC<SearchResultItemProps> = ({ item }) => {
  const navigate = useNavigate();

  const handleClick = () => navigate(`/videos/${item.video_id}`);
  console.table(item.poster_url);

  return (
    <List.Item className={styles.listItem} onClick={handleClick} style={{ padding: 2 }}>
      <Card
        bordered
        cover={
          <Image
            fallback={FALLBACK_IMAGE}
            preview={false}
            src={item.poster_url}
            style={{ height: 240, objectFit: 'cover', width: '100%' }}
          />
        }
        hoverable
        style={{ cursor: 'pointer' }}
      >
        <Card.Meta title={<Typography.Text style={{ overflow: 'visible' }}>{item.title}</Typography.Text>} />
      </Card>
    </List.Item>
  );
};
export default SearchResultItem;

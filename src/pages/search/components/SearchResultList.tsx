import { FileImageOutlined } from '@ant-design/icons';
import { Flex, List, Skeleton, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { VideoSearchResult } from '../../../core/types/video.d.ts';
import styles from './SearchResultList.module.css';

interface SearchResultListProps {
  searchResult: VideoSearchResult;
}

const SearchResultList: React.FC<SearchResultListProps> = ({ searchResult }) => {
  const navigate = useNavigate();
  return (
    <List
      bordered
      dataSource={searchResult?.content}
      grid={{ column: 4, gutter: 8 }}
      header={
        <Flex vertical>
          <Typography.Title level={3}>검색 결과</Typography.Title>
          <Typography.Text style={{ textAlign: 'right' }}>
            총 {searchResult?.totalElements}개의 검색 결과
          </Typography.Text>
        </Flex>
      }
      renderItem={(item) => (
        <List.Item className={styles.listItems} onClick={() => navigate(`/videos/${item.videoId}`)}>
          <List.Item.Meta
            description={<Typography.Title level={5}>{item.title}</Typography.Title>}
            title={
              <Skeleton active loading>
                <FileImageOutlined />
              </Skeleton>
            }
          />
        </List.Item>
      )}
      size="large"
      style={{ padding: 24, width: '100%' }}
    />
  );
};
export default SearchResultList;

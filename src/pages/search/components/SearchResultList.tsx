import { Flex, List, Typography } from 'antd';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Page } from '../../../core/types/common.ts';
import { VideoResponseDto } from '../../../core/types/video.ts';
import SearchResultItem from './components/SearchResultItem.tsx';

const listGrid = {
  gutter: 4,
  lg: 2,
  md: 2,
  sm: 2,
  xl: 4,
  xs: 1,
  xxl: 2,
};

interface SearchResultListProps {
  isLoading?: boolean;
  pagedVideos: Page<VideoResponseDto>;
}

const SearchResultList: React.FC<SearchResultListProps> = ({ isLoading, pagedVideos }) => {
  const [params] = useSearchParams();
  const input = params.get('input');

  const handleRenderItem = (item: VideoResponseDto) => <SearchResultItem item={item} />;

  return (
    <List
      bordered
      dataSource={pagedVideos.content}
      grid={listGrid}
      header={
        input && (
          <Flex vertical>
            <Typography.Title level={3}>&quot;{input}&quot; 에 대한 검색 결과</Typography.Title>
            <Typography.Text style={{ textAlign: 'right' }}>총 {pagedVideos?.size}건의 검색 결과</Typography.Text>
          </Flex>
        )
      }
      loading={isLoading}
      renderItem={handleRenderItem}
      size="large"
      style={{ padding: 24, width: '100%' }}
    />
  );
};

SearchResultList.defaultProps = {
  isLoading: false,
};

export default SearchResultList;

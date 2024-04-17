import { Flex, List, Typography } from 'antd';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { VideoSearchDto } from '../../../core/types/video.ts';
import SearchResultItem from './components/SearchResultItem.tsx';

interface SearchResultListProps {
  searchResult: VideoSearchDto[];
}

const listGrid = {
  gutter: 4,
  lg: 4,
  md: 4,
  sm: 2,
  xl: 6,
  xs: 1,
  xxl: 8,
};
const SearchResultList: React.FC<SearchResultListProps> = ({ searchResult }) => {
  const [params] = useSearchParams();
  const input = params.get('input');

  const handleRenderItem = (item: VideoSearchDto) => <SearchResultItem item={item} />;

  return (
    <List
      bordered
      dataSource={searchResult}
      grid={listGrid}
      header={
        input && (
          <Flex vertical>
            <Typography.Title level={3}>&quot;{input}&quot; 에 대한 검색 결과</Typography.Title>
            <Typography.Text style={{ textAlign: 'right' }}>총 {searchResult?.length}건의 검색 결과</Typography.Text>
          </Flex>
        )
      }
      renderItem={handleRenderItem}
      size="large"
      style={{ padding: 24, width: '100%' }}
    />
  );
};
export default SearchResultList;

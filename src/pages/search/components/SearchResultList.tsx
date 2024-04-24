import { Flex, List, Pagination, Typography } from 'antd';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { Page } from '../../../core/types/common.ts';
import { VideoResponseDto } from '../../../core/types/video.ts';
import SearchResultItem from './components/SearchResultItem.tsx';

const listGrid = {
  gutter: 4,
  lg: 4,
  md: 4,
  sm: 2,
  xl: 6,
  xs: 1,
  xxl: 8,
};

interface SearchResultListProps {
  isLoading: boolean;
  pagedVideos: Page<VideoResponseDto>;
  statePage: {
    page: number;
    setPage: (value: number) => void;
  };
}

const SearchResultList: React.FC<SearchResultListProps> = ({
  isLoading,
  pagedVideos: { content, totalElements },
  statePage: { page, setPage },
}) => {
  const [params] = useSearchParams();
  const input = params.get('input');

  const handleRenderItem = (item: VideoResponseDto) => <SearchResultItem item={item} />;

  const handleOnChangePage = (clickedPage: number) => {
    console.log('page', clickedPage);
    setPage(clickedPage - 1);
  };

  return (
    <>
      <Pagination
        defaultCurrent={page}
        onChange={handleOnChangePage}
        showSizeChanger={false}
        showTotal={(count) => `총 ${count}건`}
        total={totalElements}
      />
      <List
        bordered
        dataSource={content}
        grid={listGrid}
        header={
          input && (
            <Flex vertical>
              <Typography.Title level={3}>&quot;{input}&quot; 에 대한 검색 결과</Typography.Title>
            </Flex>
          )
        }
        loading={isLoading}
        renderItem={handleRenderItem}
        size="large"
        style={{ padding: 24, width: '100%' }}
      />
      <Pagination defaultCurrent={page} showSizeChanger={false} />
    </>
  );
};

export default SearchResultList;

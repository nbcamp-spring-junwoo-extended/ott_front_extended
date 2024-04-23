import { Card, Flex, Typography } from 'antd';
import React, { useState } from 'react';

import { Page } from '../../core/types/common.ts';
import { VideoResponseDto } from '../../core/types/video.ts';
import SearchResultList from './components/SearchResultList.tsx';
import VideoSearchBar from './components/VideoSearchBar.tsx';

const VideoSearchScreen: React.FC = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<Page<VideoResponseDto>>({} as Page<VideoResponseDto>);

  return (
    <Card title={<Typography.Title>🔍 검색</Typography.Title>}>
      <Flex align="center" gap="large" justify="center" vertical>
        <VideoSearchBar setSearchResults={setSearchResults} stateLoading={{ isLoading, setIsLoading }} />
        <SearchResultList isLoading={isLoading} pagedVideos={searchResults} />
      </Flex>
    </Card>
  );
};

export default VideoSearchScreen;

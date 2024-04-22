import { Card, Flex, Typography } from 'antd';
import React, { useState } from 'react';

import { VideoSearchResultDto } from '../../core/types/video.ts';
import SearchResultList from './components/SearchResultList.tsx';
import VideoSearchBar from './components/VideoSearchBar.tsx';

const VideoSearchScreen: React.FC = () => {
  const [isValidInput, setIsValidInput] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<VideoSearchResultDto[]>([]);

  return (
    <Card title={<Typography.Title>🔍 검색</Typography.Title>}>
      <Flex align="center" gap="large" justify="center" vertical>
        <VideoSearchBar
          setSearchResults={setSearchResults}
          stateLoading={{ isLoading, setIsLoading }}
          stateValidInput={{ isValidInput, setIsValidInput }}
        />
        <SearchResultList searchResult={searchResults} />
      </Flex>
    </Card>
  );
};

export default VideoSearchScreen;

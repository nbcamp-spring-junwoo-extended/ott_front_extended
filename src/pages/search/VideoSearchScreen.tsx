import { Flex } from 'antd';
import React, { useState } from 'react';

import { VideoReadResponse } from '../../core/types/video.d.ts';
import SearchResultList from './components/SearchResultList.tsx';
import VideoSearchBar from './components/VideoSearchBar.tsx';

const VideoSearchScreen: React.FC = () => {
  const [isValidInput, setIsValidInput] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<VideoReadResponse[]>([]);

  return (
    <Flex align="center" gap="large" justify="center" vertical>
      <VideoSearchBar
        setSearchResults={setSearchResults}
        stateLoading={{ isLoading, setIsLoading }}
        stateValidInput={{ isValidInput, setIsValidInput }}
      />
      <SearchResultList searchResult={searchResults} />
    </Flex>
  );
};

export default VideoSearchScreen;

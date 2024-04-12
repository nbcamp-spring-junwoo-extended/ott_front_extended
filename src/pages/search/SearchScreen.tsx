import { Flex, Typography } from 'antd';
import React, { useState } from 'react';

import { VideoSearchResult } from '../../core/types/video.d.ts';
import SearchResultList from './components/SearchResultList.tsx';
import VideoSearchBar from './components/VideoSearchBar.tsx';

const SearchScreen: React.FC = () => {
  const [isValidInput, setIsValidInput] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<VideoSearchResult | null>(null);

  return (
    <Flex align="center" gap="large" justify="center" vertical>
      <VideoSearchBar
        setSearchResults={setSearchResults}
        stateLoading={{ isLoading, setIsLoading }}
        stateValidInput={{ isValidInput, setIsValidInput }}
      />

      {searchResults ? (
        <SearchResultList searchResult={searchResults} />
      ) : (
        <Typography.Title level={3}>검색어를 입력 해주세요</Typography.Title>
      )}
    </Flex>
  );
};

export default SearchScreen;

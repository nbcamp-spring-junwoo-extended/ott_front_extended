import { Space } from 'antd';
import React, { useEffect, useState } from 'react';

import { Page } from '../../../core/types/common.ts';
import { SearchOptionLabel } from '../../../core/types/search.ts';
import { VideoResponseDto } from '../../../core/types/video.ts';
import { SearchBarInput } from './components/SearchBarInput.tsx';
import { SelectSearchType } from './components/components/SelectSearchType.tsx';
import { searchOptions } from './constants/searchOptions.ts';

interface VideoSearchBarProps {
  setSearchResults: (value: Page<VideoResponseDto>) => void;
  stateLoading: {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
  };
  statePage: {
    page: number;
    setPage: (value: number) => void;
  };
}

const VideoSearchBar: React.FC<VideoSearchBarProps> = ({ setSearchResults, stateLoading, statePage }) => {
  const [selectedSearchType, setSelectedSearchType] = useState<SearchOptionLabel>('제목');
  useEffect(() => {
    statePage.setPage(0);
  }, [selectedSearchType]);

  return (
    <Space.Compact style={{ alignItems: 'center' }}>
      <SelectSearchType searchOptions={searchOptions} stateSearchType={{ selectedSearchType, setSelectedSearchType }} />
      <SearchBarInput
        selectedSearchType={selectedSearchType}
        setSearchResults={setSearchResults}
        stateLoading={stateLoading}
        statePage={statePage}
      />
    </Space.Compact>
  );
};

export default VideoSearchBar;

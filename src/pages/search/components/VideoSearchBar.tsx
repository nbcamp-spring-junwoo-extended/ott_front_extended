import { Space } from 'antd';
import React, { useState } from 'react';

import { Page } from '../../../core/types/common.ts';
import { SearchOptionLabel } from '../../../core/types/search.ts';
import { VideoResponseDto } from '../../../core/types/video.ts';
import { SearchInput } from './components/SearchInput.tsx';
import { SelectSearchType } from './components/components/SelectSearchType.tsx';
import { searchOptions } from './constants/searchOptions.ts';

interface VideoSearchBarProps {
  setSearchResults: (value: Page<VideoResponseDto>) => void;
  stateLoading: {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
  };
}

const VideoSearchBar: React.FC<VideoSearchBarProps> = ({ setSearchResults, stateLoading }) => {
  const [selectedSearchType, setSelectedSearchType] = useState<SearchOptionLabel>('제목');

  return (
    <Space.Compact style={{ alignItems: 'center' }}>
      <SelectSearchType searchOptions={searchOptions} stateSearchType={{ selectedSearchType, setSelectedSearchType }} />
      <SearchInput
        selectedSearchType={selectedSearchType}
        setSearchResults={setSearchResults}
        stateLoading={stateLoading}
      />
    </Space.Compact>
  );
};

export default VideoSearchBar;

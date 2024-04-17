import { Space } from 'antd';
import React, { useState } from 'react';

import { VideoSearchDto } from '../../../core/types/video.ts';
import { SearchInput } from './components/SearchInput.tsx';
import { SelectSearchType } from './components/SelectSearchType.tsx';
import { AutoCompleteOption, useVideoSearchBar } from './useVideoSearchBar.hooks.tsx';

interface VideoSearchBarProps {
  setSearchResults: (value: VideoSearchDto[]) => void;
  stateLoading: {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
  };
  stateValidInput: {
    isValidInput: boolean;
    setIsValidInput: (value: boolean) => void;
  };
}

const VideoSearchBar: React.FC<VideoSearchBarProps> = ({
  setSearchResults,
  stateLoading: { isLoading, setIsLoading },
  stateValidInput: { isValidInput, setIsValidInput },
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSearchType, setSelectedSearchType] = useState('제목');
  const [searchAutoComplete, setSearchAutoComplete] = useState<AutoCompleteOption[]>([]);

  useVideoSearchBar(searchTerm, setSearchAutoComplete);

  return (
    <Space.Compact style={{ alignItems: 'center' }}>
      <SelectSearchType setSelectedSearchOption={setSelectedSearchType} />

      <SearchInput
        searchAutoComplete={searchAutoComplete}
        selectedSearchType={selectedSearchType}
        setSearchResults={setSearchResults}
        setSearchTerm={setSearchTerm}
        stateLoading={{ isLoading, setIsLoading }}
        stateValidInput={{ isValidInput, setIsValidInput }}
      />
    </Space.Compact>
  );
};

export default VideoSearchBar;

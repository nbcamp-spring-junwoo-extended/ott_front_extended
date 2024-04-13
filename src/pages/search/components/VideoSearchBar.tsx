import { AutoComplete, Select, Space } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';

import { getSearchComplete, searchVideos } from '../../../core/apis/videoApi.ts';
import { VideoSearchResult } from '../../../core/types/video';
import { useDebounce } from '../../../hooks/useDebounce.ts';

export interface VideoSearchBarProps {
  setSearchResults: (value: VideoSearchResult) => void;
  stateLoading: {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
  };
  stateValidInput: {
    isValidInput: boolean;
    setIsValidInput: (value: boolean) => void;
  };
}

interface SelectSearchTypeProps {
  setSelectedSearchOption: (value: string) => void;
}

interface AutoCompleteOption {
  label: string;
  value: string;
}

const fakeAutoComplete = [
  {
    label: '푸',
    value: '푸',
  },
  {
    label: '돌',
    value: '돌',
  },
  {
    label: '미',
    value: '미',
  },
];

const SelectSearchType: React.FC<SelectSearchTypeProps> = ({ setSelectedSearchOption }) => {
  const searchOptions = [
    { label: '제목', value: '제목' },
    { disabled: true, label: '내용', value: '내용' },
    { disabled: true, label: '카테고리', value: '카테고리' },
  ];

  return (
    <Select
      defaultValue="제목"
      onChange={(e) => setSelectedSearchOption(e.value)}
      options={searchOptions}
      style={{ minHeight: 40, minWidth: 100, top: 4, width: 'fit-content' }}
    />
  );
};

const VideoSearchBar: React.FC<VideoSearchBarProps> = ({
  setSearchResults,
  stateLoading: { isLoading, setIsLoading },
  stateValidInput: { isValidInput, setIsValidInput },
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSearchType, setSelectedSearchType] = useState<string>('제목');
  const [searchAutoComplete, setSearchAutoComplete] =
    useState<AutoCompleteOption[]>(fakeAutoComplete);

  const handleSearchTermChange = ({ target: { value } }) => {
    setSearchTerm(value);
    setIsValidInput(!!value.length);
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    if (!debouncedSearchTerm) return;

    const response = getSearchComplete(debouncedSearchTerm);
    const newAutoComplete: AutoCompleteOption[] = response?.data?.data.titles.map((title) => ({
      label: title,
      value: title,
    }));
    setSearchAutoComplete(newAutoComplete);
  }, [debouncedSearchTerm]);
  const handleSearch = (value) => {
    if (!value) return;
    setIsLoading(true);
    searchVideos(selectedSearchType, value)
      .then(({ data }) => setSearchResults(data?.data ?? []))
      .finally(() => setIsLoading(false));
  };

  return (
    <Space align="center" size={0}>
      <SelectSearchType setSelectedSearchOption={setSelectedSearchType} />
      <AutoComplete options={searchAutoComplete}>
        {selectedSearchType === '제목' && (
          <Search
            allowClear
            enterButton="Search"
            loading={isLoading}
            onChange={handleSearchTermChange}
            onSearch={handleSearch}
            placeholder="검색어를 입력 해주세요"
            size="large"
            status={isValidInput ? '' : 'error'}
            style={{ maxWidth: 600, minWidth: 400 }}
          />
        )}
      </AutoComplete>
    </Space>
  );
};

export default VideoSearchBar;

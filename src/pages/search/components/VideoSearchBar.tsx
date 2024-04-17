import { AutoComplete, Select, Space } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { getSearchComplete, searchVideos } from '../../../core/apis/videoApi.ts';
import { VideoSearchDto } from '../../../core/types/video.ts';
import { useDebounce } from '../../../hooks/useDebounce.ts';

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

interface SelectSearchTypeProps {
  setSelectedSearchOption: (value: string) => void;
}

interface AutoCompleteOption {
  label: string;
  value: string;
}

const SelectSearchType: React.FC<SelectSearchTypeProps> = ({ setSelectedSearchOption }) => {
  const searchOptions = [
    { label: '제목', value: '제목' },
    { disabled: true, label: '내용', value: '내용' },
    { disabled: true, label: '카테고리', value: '카테고리' },
  ];

  return (
    <Select
      defaultValue="제목"
      onChange={(e) => setSelectedSearchOption(e.valueOf())}
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
  const [_, setParams] = useSearchParams();
  const [searchAutoComplete, setSearchAutoComplete] = useState<AutoCompleteOption[]>([]);

  const handleSearchTermChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value);
    setIsValidInput(Boolean(value.length));
  };

  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  useEffect(() => {
    if (!debouncedSearchTerm) return;

    getSearchComplete(debouncedSearchTerm).then((response) => {
      const { titles } = response.data.data;
      const newAutoComplete: AutoCompleteOption[] = titles.map((title) => ({
        label: title,
        value: title,
      }));

      setSearchAutoComplete(newAutoComplete);
    });
  }, [debouncedSearchTerm]);
  const handleSearch = (value: string) => {
    if (!value) return;
    setIsLoading(true);
    setParams({ input: value });
    searchVideos(selectedSearchType, value)
      .then((response) => response.data.data.videoReadResponseDtoList)
      .then((responseSearchResults) => setSearchResults(responseSearchResults))
      .finally(() => setIsLoading(false));
  };

  return (
    <Space.Compact style={{ alignItems: 'center' }}>
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
    </Space.Compact>
  );
};

export default VideoSearchBar;

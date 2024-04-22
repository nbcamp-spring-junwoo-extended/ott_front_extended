import { AutoComplete, message } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import { searchVideos } from '../../../../core/apis/videoApi.ts';
import { VideoSearchResultDto } from '../../../../core/types/video.ts';
import { AutoCompleteOption } from '../useVideoSearchBar.hooks.tsx';

type SearchInputProps = {
  searchAutoComplete: AutoCompleteOption[];
  selectedSearchType: string;
  setSearchResults: (value: VideoSearchResultDto[]) => void;
  setSearchTerm: (value: string) => void;
  stateLoading: {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
  };
  stateValidInput: {
    isValidInput: boolean;
    setIsValidInput: (value: boolean) => void;
  };
};
export const SearchInput: React.FC<SearchInputProps> = ({
  searchAutoComplete,
  selectedSearchType,
  setSearchResults,
  setSearchTerm,
  stateLoading: { isLoading, setIsLoading },
  stateValidInput: { isValidInput, setIsValidInput },
}) => {
  const [_, setParams] = useSearchParams();

  const handleSearch = async (value: string) => {
    if (!value) return;

    setIsLoading(true);
    try {
      const response = await searchVideos(selectedSearchType, value);
      setSearchResults(response.data.data.videos);
      setParams({ input: value });
    } catch (e) {
      if (axios.isAxiosError(e)) message.error(e.message);
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchTermChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value);
    setIsValidInput(Boolean(value.length));
  };

  return (
    <AutoComplete options={searchAutoComplete}>
      <Search
        allowClear
        enterButton="Search"
        loading={isLoading}
        onChange={handleSearchTermChange}
        onClick={() => setIsValidInput(false)}
        onSearch={handleSearch}
        placeholder="검색어를 입력 해주세요"
        size="large"
        status={isValidInput ? '' : 'error'}
        style={{ maxWidth: 600, minWidth: 400 }}
      />
    </AutoComplete>
  );
};

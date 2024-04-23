import { AutoComplete, message } from 'antd';
import Search from 'antd/es/input/Search';
import axios from 'axios';
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { searchVideosByTitle } from '../../../../../core/apis/videoApi.ts';
import { Page } from '../../../../../core/types/common.ts';
import { VideoResponseDto } from '../../../../../core/types/video.ts';
import { useSearchInputTitle } from '../../../../../hooks/video/useSearchInputTitle.ts';

type SearchInputProps = {
  setSearchResults: (value: Page<VideoResponseDto>) => void;
  stateLoading: {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
  };
};
export const SearchInputTitle: React.FC<SearchInputProps> = ({
  setSearchResults,
  stateLoading: { isLoading, setIsLoading },
}) => {
  const [, setParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const searchAutoComplete = useSearchInputTitle(searchTerm);
  const [isValidInput, setIsValidInput] = useState<boolean>(true);

  const handleSearch = async (value: string) => {
    if (!value) return;

    setIsLoading(true);
    try {
      const response = await searchVideosByTitle(value);
      setSearchResults(response.data.data);
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

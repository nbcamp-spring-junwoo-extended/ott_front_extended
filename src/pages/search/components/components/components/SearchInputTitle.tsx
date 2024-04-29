import { AutoComplete } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useState } from 'react';

import { Page } from '../../../../../core/types/common.ts';
import { VideoResponseDto } from '../../../../../core/types/video.ts';
import { useDidMountEffect } from '../../../../../hooks/common/useDidMountEffect.ts';
import { useSearchInputTitle } from '../../../../../hooks/video/useSearchInputTitle.ts';
import useSearchVideosByInput from '../../../../../hooks/video/useSearchVideosByInput.ts';

const MIN_SEARCH_TERM_LENGTH = 1;

type SearchInputTitleProps = {
  setSearchResults: (value: Page<VideoResponseDto>) => void;
  stateLoading: {
    isLoading: boolean;
    setIsLoading: (value: boolean) => void;
  };
  statePage: {
    page: number;
    setPage: (value: number) => void;
  };
};
export const SearchInputTitle: React.FC<SearchInputTitleProps> = ({
  setSearchResults,
  stateLoading: { setIsLoading },
  statePage: { page, setPage },
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isValidInput, setIsValidInput] = useState<boolean>(true);
  const searchAutoComplete = useSearchInputTitle(searchTerm);
  const { isSearching, onSearch, pagedVideos } = useSearchVideosByInput(searchTerm, 'TITLE', page);

  useDidMountEffect(() => {
    setIsLoading(isSearching);
    setSearchResults(pagedVideos);
  }, [isSearching, pagedVideos, setIsLoading, setSearchResults]);

  const handleSearchTermChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setIsValidInput(value.length >= MIN_SEARCH_TERM_LENGTH);
    setSearchTerm(value);
  };

  const handleSearch = () => {
    if (!isValidInput) return;

    setPage(0);
    onSearch(searchTerm).then();
  };

  return (
    <AutoComplete onChange={(value) => setSearchTerm(value)} options={searchAutoComplete}>
      <Search
        allowClear
        enterButton="Search"
        loading={isSearching}
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

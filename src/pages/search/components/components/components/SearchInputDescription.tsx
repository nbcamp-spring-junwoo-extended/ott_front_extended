import { AutoComplete } from 'antd';
import Search from 'antd/es/input/Search';
import React, { useState } from 'react';

import { Page } from '../../../../../core/types/common.ts';
import { VideoResponseDto } from '../../../../../core/types/video.ts';
import { useDidMountEffect } from '../../../../../hooks/common/useDidMountEffect.ts';
import { useSearchAutoComplete } from '../../../../../hooks/video/useSearchAutoComplete.ts';
import useSearchVideosByInput from '../../../../../hooks/video/useSearchVideosByInput.ts';

type SearchInputDescriptionProps = {
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

export const SearchInputDescription: React.FC<SearchInputDescriptionProps> = ({
  setSearchResults,
  stateLoading: { setIsLoading },
  statePage: { page, setPage },
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isValidInput, setIsValidInput] = useState<boolean>(true);
  const { searchAutoComplete } = useSearchAutoComplete(searchTerm);
  const { isSearching, onSearch, pagedVideos } = useSearchVideosByInput(searchTerm, 'DESCRIPTION', page);

  useDidMountEffect(() => {
    setIsLoading(isSearching);
    setSearchResults(pagedVideos);
  }, [isSearching, pagedVideos, setIsLoading, setSearchResults]);

  const handleSearchTermChange = ({ target: { value } }: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(value);
    setIsValidInput(Boolean(value.length));
  };

  const handleSearch = () => {
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

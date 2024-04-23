import React from 'react';

import { Page } from '../../../../core/types/common.ts';
import { SearchOptionLabel } from '../../../../core/types/search.ts';
import { VideoResponseDto } from '../../../../core/types/video.ts';
import { SearchInputGenre } from './components/SearchInputGenre.tsx';
import { SearchInputTitle } from './components/SearchInputTitle.tsx';

export type SearchInputProps = {
  selectedSearchType: SearchOptionLabel;
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

export const SearchBarInput: React.FC<SearchInputProps> = ({
  selectedSearchType,
  setSearchResults,
  stateLoading,
  statePage,
}) => {
  switch (selectedSearchType) {
    case '장르':
      return <SearchInputGenre setSearchResults={setSearchResults} stateLoading={stateLoading} statePage={statePage} />;
    case '제목':
    default:
      return <SearchInputTitle setSearchResults={setSearchResults} stateLoading={stateLoading} statePage={statePage} />;
  }
};

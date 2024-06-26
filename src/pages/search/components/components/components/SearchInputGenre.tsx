import { SearchOutlined } from '@ant-design/icons';
import { Button, Select, Space } from 'antd';
import React, { useState } from 'react';

import { Page } from '../../../../../core/types/common.ts';
import { GenreLabel, OperationLabel } from '../../../../../core/types/search.ts';
import { VideoResponseDto } from '../../../../../core/types/video.ts';
import { useDidMountEffect } from '../../../../../hooks/common/useDidMountEffect.ts';
import { useSearchVideosByGenre } from '../../../../../hooks/video/useSearchVideosByGenre.ts';
import styles from '../../SearchResultList.module.css';
import { genreOptions, operationOptions } from '../../constants/searchOptions.ts';

const MAX_COUNT: number = 3;

interface SearchInputGenreProps {
  setSearchResults: (value: Page<VideoResponseDto>) => void;
  stateLoading: { isLoading: boolean; setIsLoading: (value: boolean) => void };
  statePage: {
    page: number;
    setPage: (value: number) => void;
  };
}

export const SearchInputGenre: React.FC<SearchInputGenreProps> = ({
  setSearchResults,
  stateLoading: { setIsLoading },
  statePage: { page, setPage },
}) => {
  const [selectedOperation, setSelectedOperation] = useState<OperationLabel>(operationOptions[0].label);
  const [selectedGenres, setSelectedGenres] = useState<GenreLabel[]>([]);

  const { isSearching, onSearch, pagedVideos } = useSearchVideosByGenre(page, selectedOperation, selectedGenres);

  useDidMountEffect(() => {
    setIsLoading(isSearching);
    setSearchResults(pagedVideos);
  }, [isSearching, pagedVideos, setIsLoading, setSearchResults]);

  const handleSearchClick = () => {
    setPage(0);
    onSearch(selectedOperation, selectedGenres).then();
  };

  const genresSuffix = (
    <span>
      {selectedGenres.length} / {MAX_COUNT}
    </span>
  );

  return (
    <Space.Compact block>
      <Select
        className={styles.searchBar}
        defaultValue={selectedOperation}
        onChange={(e: OperationLabel) => setSelectedOperation(e)}
        options={operationOptions}
      />
      <Select
        allowClear
        className={styles.searchBar}
        maxCount={MAX_COUNT}
        mode="multiple"
        onChange={(e: GenreLabel[]) => setSelectedGenres(e)}
        options={genreOptions}
        placeholder="장르를 선택해주세요"
        size="large"
        style={{ minWidth: '24rem' }}
        suffixIcon={genresSuffix}
      />
      <Button
        loading={isSearching}
        onClick={handleSearchClick}
        style={{ height: 40, top: 4, width: 'max-content' }}
        type="primary"
      >
        <SearchOutlined />
      </Button>
    </Space.Compact>
  );
};

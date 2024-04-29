import { Select } from 'antd';
import React from 'react';

import { SearchOptionLabel, SearchOptionType } from '../../../../../core/types/search.ts';
import styles from '../../SearchResultList.module.css';

interface SelectSearchTypeProps {
  searchOptions: SearchOptionType[];
  stateSearchType: { selectedSearchType: SearchOptionLabel; setSelectedSearchType: (value: SearchOptionLabel) => void };
}

export const SelectSearchType: React.FC<SelectSearchTypeProps> = ({
  searchOptions,
  stateSearchType: { selectedSearchType, setSelectedSearchType },
}) => {
  return (
    <Select
      className={styles.searchBar}
      defaultValue={selectedSearchType}
      onChange={(e: SearchOptionLabel) => setSelectedSearchType(e)}
      options={searchOptions}
    />
  );
};

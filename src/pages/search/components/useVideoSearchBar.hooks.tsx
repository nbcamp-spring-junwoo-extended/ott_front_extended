import { useEffect } from 'react';

import { getSearchComplete } from '../../../core/apis/videoApi.ts';
import { useDebounce } from '../../../hooks/useDebounce.ts';

export interface AutoCompleteOption {
  label: string;
  value: string;
}

export const useVideoSearchBar = (searchTerm: string, setSearchAutoComplete: (value: AutoCompleteOption[]) => void) => {
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
};

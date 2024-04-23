import { useCallback, useEffect, useState } from 'react';

import { getSearchComplete } from '../../core/apis/videoApi.ts';
import { useDebounce } from '../common/useDebounce.ts';

export interface AutoCompleteOption {
  label: string;
  value: string;
}

export const useSearchInputTitle = (searchTerm: string) => {
  const [searchAutoComplete, setSearchAutoComplete] = useState<AutoCompleteOption[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const fetchSearchComplete = useCallback(async () => {
    const response = await getSearchComplete(debouncedSearchTerm);
    const { titles } = response.data.data;
    const newAutoComplete: AutoCompleteOption[] = titles.map((title) => ({
      label: title,
      value: title,
    }));

    setSearchAutoComplete(newAutoComplete);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    if (!debouncedSearchTerm) return;

    fetchSearchComplete().then();
  }, [fetchSearchComplete]);

  return searchAutoComplete;
};

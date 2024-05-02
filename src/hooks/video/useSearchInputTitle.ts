import { useCallback, useEffect, useRef, useState } from 'react';

import { getSearchComplete } from '../../core/apis/videoApi.ts';
import { notifyIfAxiosError } from '../../utils/axiosUtils.ts';
import { useDebounce } from '../common/useDebounce.ts';

export interface AutoCompleteOption {
  label: string;
  value: string;
}

export const useSearchInputTitle = (searchTerm: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [searchAutoComplete, setSearchAutoComplete] = useState<AutoCompleteOption[]>([]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  const abortController = useRef<AbortController | null>(null);

  const fetchSearchComplete = useCallback(async () => {
    if (!debouncedSearchTerm) return;

    abortController?.current?.abort();
    abortController.current = new AbortController();
    const { signal } = abortController.current;

    setIsLoading(true);
    try {
      const response = await getSearchComplete(debouncedSearchTerm, 0, signal);
      const { titles } = response.data.data;
      const newAutoComplete: AutoCompleteOption[] = titles.map((title) => ({
        label: title,
        value: title,
      }));
      setSearchAutoComplete(newAutoComplete);
    } catch (e) {
      notifyIfAxiosError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearchTerm]);

  useEffect(() => {
    fetchSearchComplete().then();
  }, [fetchSearchComplete]);

  return { isLoading, searchAutoComplete };
};

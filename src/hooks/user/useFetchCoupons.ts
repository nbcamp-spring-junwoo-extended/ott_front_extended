import { useCallback, useEffect, useRef, useState } from 'react';

import { myCoupons } from '../../core/apis/userApi.ts';
import { UserCoupon } from '../../core/types/user.ts';
import { notifyIfAxiosError } from '../../utils/axiosUtils.ts';

export const useFetchCoupons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState<UserCoupon[]>([]);

  const abortController = useRef<AbortController | null>(null);

  const fetchCoupons = useCallback(async () => {
    abortController?.current?.abort();
    abortController.current = new AbortController();
    const { signal } = abortController.current;

    setIsLoading(true);
    try {
      const response = await myCoupons(signal);
      const responseCoupons = response.data.data.content;
      setCoupons(responseCoupons);
    } catch (e) {
      notifyIfAxiosError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoupons().then();
  }, [fetchCoupons]);

  return { coupons, isLoading };
};

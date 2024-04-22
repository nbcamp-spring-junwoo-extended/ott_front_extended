import { message } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { myCoupons } from '../../core/apis/userApi.ts';
import { UserCoupon } from '../../core/types/user.ts';

export const useFetchCoupons = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [coupons, setCoupons] = useState<UserCoupon[]>([]);

  const fetchCoupons = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);

    try {
      const response = await myCoupons();
      const responseCoupons = response.data.data.content;
      setCoupons(responseCoupons);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error(e.response?.data?.message || e.message || '알 수 없는 오류가 발생했습니다.');
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCoupons().then();
  }, [fetchCoupons]);

  return { coupons, isLoading };
};

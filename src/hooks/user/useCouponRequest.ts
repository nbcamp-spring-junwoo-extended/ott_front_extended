import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { postCouponIssuance } from '../../core/apis/notificationApi.ts';

const useCouponRequest = (couponId: number) => {
  const [isRequesting, setIsRequesting] = useState(false);
  const [requestError, setRequestError] = useState('');

  const requestCoupon = useCallback(async () => {
    setIsRequesting(true);
    try {
      await postCouponIssuance(couponId);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setRequestError(error.response?.data.message || error.message);
      } else {
        setRequestError('알 수 없는 오류가 발생했습니다.');
      }
    } finally {
      setIsRequesting(false);
    }
  }, [couponId]);

  useEffect(() => {
    requestCoupon().then();
  }, [requestCoupon]);

  return { isRequesting, requestError };
};

export default useCouponRequest;

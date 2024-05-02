import { useCallback, useEffect, useRef, useState } from 'react';

import { postCouponIssuance } from '../../core/apis/notificationApi.ts';
import { notifyIfAxiosError } from '../../utils/axiosUtils.ts';

const useCouponRequest = (couponId: number) => {
  const [isRequesting, setIsRequesting] = useState(false);

  const abortController = useRef<AbortController | null>(null);

  const requestCoupon = useCallback(async () => {
    abortController?.current?.abort();
    abortController.current = new AbortController();
    const { signal } = abortController.current;

    setIsRequesting(true);
    try {
      await postCouponIssuance(couponId, signal);
    } catch (e) {
      notifyIfAxiosError(e as Error);
    } finally {
      setIsRequesting(false);
    }
  }, [couponId]);

  useEffect(() => {
    requestCoupon().then();
  }, [requestCoupon]);

  return { isRequesting };
};

export default useCouponRequest;

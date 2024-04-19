import { message } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';

import { myCoupons } from '../../../core/apis/userApi.ts';
import { UserCoupon } from '../../../core/types/user.ts';

export const useCouponListCard = (
  isLoading: boolean,
  setIsLoading: (value: ((prevState: boolean) => boolean) | boolean) => void,
  setCoupons: (value: ((prevState: UserCoupon[]) => UserCoupon[]) | UserCoupon[]) => void,
) => {
  useEffect(() => {
    if (isLoading) return;
    setIsLoading(true);

    const fetchCoupons = async () => {
      try {
        const response = await myCoupons();
        const responseCoupons = response.data.data.content;
        setCoupons(responseCoupons);
      } catch (e) {
        if (axios.isCancel(e)) message.error(e.message);
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCoupons().then();
  }, []);
};

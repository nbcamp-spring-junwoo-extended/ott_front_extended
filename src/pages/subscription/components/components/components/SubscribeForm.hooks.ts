import { message } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';

import { myCards, myCoupons } from '../../../../../core/apis/userApi.ts';
import { UserCard, UserCoupon } from '../../../../../core/types/user.ts';

type useSubscribeFromProps = {
  setCards: (value: UserCard[]) => void;
  setCoupons: (value: UserCoupon[]) => void;
};

export const useSubscribeForm = ({ setCards, setCoupons }: useSubscribeFromProps) => {
  useEffect(() => {
    async function extracted() {
      try {
        const [responseCards, responseCoupons] = await Promise.all([myCards(), myCoupons()]);
        setCards(responseCards.data.data);
        setCoupons(responseCoupons.data.data.content);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          message.error(error.message);
        }
        console.error(error);
      }
    }

    extracted().then();
  }, []);
};

import { message } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';

import { myCards } from '../../../core/apis/userApi.ts';
import { UserCard } from '../../../core/types/user.ts';

type useProfileScreenProps = {
  setCards: (value: UserCard[]) => void;
};
export const useProfileScreenHooks = ({ setCards }: useProfileScreenProps) => {
  useEffect(() => {
    const fetchProfileAndCards = async () => {
      try {
        const responseCards = await myCards();
        const cards = responseCards.data.data;
        setCards(cards);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          message.error(error.message);
        }
        console.log(error);
      }
    };

    fetchProfileAndCards().then();
  }, [setCards]);
};
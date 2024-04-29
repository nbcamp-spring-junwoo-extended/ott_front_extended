import { useFetchCards } from '../../../../../hooks/user/useFetchCards.ts';
import { useFetchCoupons } from '../../../../../hooks/user/useFetchCoupons.ts';
import useFetchProfile from '../../../../../hooks/user/useFetchProfile.ts';

const useSubscribeForm = () => {
  const { cards } = useFetchCards();
  const { coupons } = useFetchCoupons();
  const { userProfile } = useFetchProfile();

  return { cards, coupons, userProfile };
};

export default useSubscribeForm;

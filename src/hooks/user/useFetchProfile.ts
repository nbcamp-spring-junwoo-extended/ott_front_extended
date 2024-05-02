import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { myProfile } from '../../core/apis/userApi.ts';
import { userActions } from '../../core/reducer/userSlice.ts';
import { DateArray } from '../../core/types/common.ts';
import { MembershipType, UserProfile } from '../../core/types/user.ts';
import { notifyIfAxiosError } from '../../utils/axiosUtils.ts';

const initialUserState: UserProfile = {
  authorityType: '',
  born: [9999, 12, 31] as DateArray,
  email: '',
  membershipType: MembershipType.ROLE_NORMAL,
  userId: 0,
  username: '',
};

const useFetchProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserState);

  const dispatch = useDispatch();
  const abortController = useRef<AbortController | null>(null);

  const fetchProfile = useCallback(async () => {
    abortController?.current?.abort();
    abortController.current = new AbortController();
    const { signal } = abortController.current;

    try {
      const response = await myProfile(signal);
      setUserProfile(response.data.data);
      dispatch(userActions.updateUserId({ userId: response.data.data.userId }));
    } catch (e) {
      notifyIfAxiosError(e as Error);
    } finally {
      setIsLoading(false);
    }
  }, [dispatch]);

  useEffect(() => {
    fetchProfile().then();
  }, [fetchProfile]);

  return { isLoading, userProfile };
};

export default useFetchProfile;

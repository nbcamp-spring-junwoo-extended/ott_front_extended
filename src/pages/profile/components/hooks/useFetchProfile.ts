import { message } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';

import { myProfile } from '../../../../core/apis/userApi.ts';
import { userActions } from '../../../../core/reducer/userSlice.ts';
import { DateArray } from '../../../../core/types/common.ts';
import { UserProfile } from '../../../../core/types/user.ts';

const initialUserState = {
  authorityType: '',
  born: [9999, 12, 31] as DateArray,
  email: '',
  membershipType: '',
  userId: 0,
  username: '',
};

const useFetchProfile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserState);

  const dispatch = useDispatch();

  const fetchProfile = useCallback(async () => {
    myProfile()
      .then((response) => {
        setUserProfile(response.data.data);
        dispatch(userActions.updateUserId({ userId: response.data.data.userId }));
      })
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          message.error(error.message).then();
        }
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  useEffect(() => {
    fetchProfile().then();
  }, [fetchProfile]);

  return { isLoading, userProfile };
};

export default useFetchProfile;

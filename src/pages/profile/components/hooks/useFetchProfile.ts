import { message } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { myProfile } from '../../../../core/apis/userApi.ts';
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

  useEffect(() => {
    myProfile()
      .then((response) => setUserProfile(response.data.data))
      .catch((error) => {
        if (axios.isAxiosError(error)) {
          message.error(error.message).then();
        }
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return { isLoading, userProfile };
};

export default useFetchProfile;

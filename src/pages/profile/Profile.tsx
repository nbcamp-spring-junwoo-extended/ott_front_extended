import React, { useEffect, useState } from 'react';
import { myProfile, UserProfile } from '../../core/apis/userApi.ts';
import ProfileCard from './components/ProfileCard.tsx';

const Profile: React.FC = () => {
  const [userProfile, setUserProfile] = useState<UserProfile>({
    userId: 0,
    username: '',
    born: '',
    authorityType: '',
    email: '',
    membershipType: '',
  });
  useEffect(() => {
    myProfile().then((response) => setUserProfile(response.data.data));
  }, []);
  return (
    <div>
      <ProfileCard userProfile={userProfile} />
    </div>
  );
};

export default Profile;

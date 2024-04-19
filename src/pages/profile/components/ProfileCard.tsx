import { Button, Card, List, Typography, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { myProfile } from '../../../core/apis/userApi.ts';
import { DateArray } from '../../../core/types/common.ts';
import { UserProfile } from '../../../core/types/user.ts';
import { dateArrayToString } from '../../../utils/dateUtil.ts';
import styles from '../Profile.module.css';
import { ProfileCardTitle } from './components/ProfileCardTitle.tsx';

const initialUserState = {
  authorityType: '',
  born: [9999, 12, 12] as DateArray,
  email: '',
  membershipType: '',
  userId: 0,
  username: '',
};

const ProfileCard: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>(initialUserState);

  const navigation = useNavigate();

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
  const onSubscriptionClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement;

    switch (target.innerText) {
      case '구독':
        navigation('/subscribe');
        break;
      case '구독 취소':
      default:
        /* TODO: implement subscription cancel logic */
        alert('TODO');
        break;
    }
  };

  const listItem: { content: string; title: string }[] = [
    {
      content: userProfile.username,
      title: '닉네임',
    },
    {
      content: userProfile.email,
      title: '이메일',
    },
    {
      content: dateArrayToString(userProfile.born),
      title: '생년월일',
    },
    {
      content: userProfile.membershipType.slice(5),
      title: '멤버쉽 등급',
    },
  ];

  return (
    <div>
      <Card loading={isLoading} title={<ProfileCardTitle />}>
        <List
          bordered
          dataSource={listItem}
          renderItem={(item) => (
            <List.Item className={styles.item}>
              <Typography.Text>
                {item.title}: {item.content}
              </Typography.Text>
              {item.title === '멤버쉽 등급' && (
                <Button danger onClick={onSubscriptionClick} type="primary">
                  {item.content === 'NORMAL' ? '구독' : '구독 취소'}
                </Button>
              )}
            </List.Item>
          )}
          size="small"
        />
      </Card>
    </div>
  );
};

export default ProfileCard;

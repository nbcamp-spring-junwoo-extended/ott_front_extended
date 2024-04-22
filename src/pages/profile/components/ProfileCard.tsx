import { Button, Card, List, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import useFetchProfile from '../../../hooks/user/useFetchProfile.ts';
import { dateArrayToString } from '../../../utils/dateUtil.ts';
import styles from '../Profile.module.css';
import { ProfileCardTitle } from './components/ProfileCardTitle.tsx';

const ProfileCard: React.FC = () => {
  const navigation = useNavigate();
  const { isLoading, userProfile } = useFetchProfile();
  const { born, email, membershipType, username } = userProfile;

  const onSubscriptionClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
      content: username,
      title: '닉네임',
    },
    {
      content: email,
      title: '이메일',
    },
    {
      content: dateArrayToString(born),
      title: '생년월일',
    },
    {
      content: membershipType.slice(5),
      title: '멤버쉽 등급',
    },
  ];

  return (
    <div>
      <Card loading={isLoading} title={<ProfileCardTitle userProfile={userProfile} />}>
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

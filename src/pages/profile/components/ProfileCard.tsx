import { Button, Card, List, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { UserProfile } from '../../../core/types/user.ts';
import styles from '../Profile.module.css';
import { ProfileCardTitle } from './components/ProfileCardTitle.tsx';

interface ProfileCardProps {
  userProfile: UserProfile;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userProfile }) => {
  const navigation = useNavigate();
  const onSubscriptionClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    switch (e.target.valueOf()) {
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

  const listItem = [
    {
      content: userProfile.username,
      title: '닉네임',
    },
    {
      content: userProfile.email,
      title: '이메일',
    },
    {
      content: userProfile.born,
      title: '생년월일',
    },
    {
      content: userProfile.membershipType.substring(5),
      title: '멤버쉽 등급',
    },
  ];

  return (
    <div>
      <Card title={<ProfileCardTitle />}>
        <List
          bordered
          className={styles.postCards}
          dataSource={listItem}
          renderItem={(i) => (
            <List.Item className={styles.item}>
              <Typography.Text>
                {i.title}: {i.content}
              </Typography.Text>
              {i.title === '멤버쉽 등급' && (
                <Button danger onClick={onSubscriptionClick} type="primary">
                  {i.content === 'NORMAL' ? '구독' : '구독 취소'}
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

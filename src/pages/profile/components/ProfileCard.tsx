import React from 'react';
import { Button, Card, List, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserProfile } from '../../../core/apis/userApi.ts';

import style from './ProfileCard.module.css';

interface ProfileCardProps {
  userProfile?: UserProfile;
}

const ProfileCard: React.FC = ({ userProfile }) => {
  const navigation = useNavigate();
  const onSubscriptionClick = () => {
    navigation('/subscribe');
  };

  console.log(userProfile);
  const item = [
    {
      title: 'Username',
      content: userProfile?.username,
    },
    {
      title: 'Email',
      content: userProfile?.email,
    },
    {
      title: 'Birthday',
      content: userProfile?.born,
    },
    {
      title: 'MembershipType',
      content: userProfile?.membershipType.substring(5),
    },
  ];
  console.table(item);

  return (
    <div>
      <Card title="Profile" className={style.card}>
        <List
          size="small"
          className={style.list}
          dataSource={item}
          renderItem={(i) => (
            <List.Item className={style.item}>
              <Typography.Text>
                {i.title}: {i.content}
              </Typography.Text>
              {i.title === 'MembershipType' && i.content === 'NORMAL' ? (
                <Button danger type="primary" onClick={onSubscriptionClick}>
                  구독
                </Button>
              ) : null}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ProfileCard;

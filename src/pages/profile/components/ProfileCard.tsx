import { Button, Card, List, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { UserProfile } from '../../../core/apis/userApi.ts';
import style from '../Profile.module.css';

interface ProfileCardProps {
  userProfile?: UserProfile;
}

const ProfileCardTitle = () => (
  <div>
    <Typography.Title level={5}>프로필</Typography.Title>
    <Button
      type="primary"
      className={style.postCards}
      onClick={() => alert('TODO')}
      // TODO: Implement the onClick event
    >
      수정
    </Button>
  </div>
);
const ProfileCard: React.FC<ProfileCardProps> = ({ userProfile }) => {
  const navigation = useNavigate();
  const onSubscriptionClick = (e) => {
    switch (e.target.innerText) {
      case '구독':
        navigation('/subscribe');
        break;
      case '구독 취소':
        /* TODO: implement subscription cancel logic */
        alert('TODO');
    }
  };

  const item = [
    {
      title: '닉네임',

      content: userProfile?.username,
    },
    {
      title: '이메일',
      content: userProfile?.email,
    },
    {
      title: '생년월일',
      content: userProfile?.born,
    },
    {
      title: '멤버쉽 등급',
      content: userProfile?.membershipType.substring(5),
    },
  ];

  return (
    <div>
      <Card title={<ProfileCardTitle />}>
        <List
          size="small"
          className={style.list}
          bordered
          dataSource={item}
          renderItem={(i) => (
            <List.Item className={style.item}>
              <Typography.Text>
                {i.title}: {i.content}
              </Typography.Text>
              {i.title === '멤버쉽 등급' && (
                <Button danger type="primary" onClick={onSubscriptionClick}>
                  {i.content === 'NORMAL' ? '구독' : '구독 취소'}
                </Button>
              )}
            </List.Item>
          )}
        />
      </Card>
    </div>
  );
};

export default ProfileCard;

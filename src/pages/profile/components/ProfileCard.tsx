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
      className={style.postCards}
      onClick={() => alert('TODO')}
      type="primary"
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
      content: userProfile?.username,

      title: '닉네임',
    },
    {
      content: userProfile?.email,
      title: '이메일',
    },
    {
      content: userProfile?.born,
      title: '생년월일',
    },
    {
      content: userProfile?.membershipType.substring(5),
      title: '멤버쉽 등급',
    },
  ];

  return (
    <div>
      <Card title={<ProfileCardTitle />}>
        <List
          bordered
          className={style.list}
          dataSource={item}
          renderItem={(i) => (
            <List.Item className={style.item}>
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

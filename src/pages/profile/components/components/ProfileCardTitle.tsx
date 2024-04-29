import { Button, Modal, Typography } from 'antd';
import React, { useState } from 'react';

import { UserProfile } from '../../../../core/types/user.ts';
import styles from '../../Profile.module.css';
import { UserProfileEditForm } from './UserProfileEditForm.tsx';

interface ProfileCardTitleProps {
  userProfile: UserProfile;
}

export const ProfileCardTitle: React.FC<ProfileCardTitleProps> = ({ userProfile }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const onEditClick = () => {
    if (isModalOpen) {
      return;
    }
    setIsModalOpen(true);
  };

  return (
    <>
      <Typography.Title level={5}>프로필</Typography.Title>
      <Button className={styles.postCards} onClick={onEditClick} type="primary">
        수정
      </Button>

      <Modal centered footer={null} onCancel={() => setIsModalOpen(false)} open={isModalOpen} title="프로필 수정">
        <UserProfileEditForm userProfile={userProfile} />
      </Modal>
    </>
  );
};

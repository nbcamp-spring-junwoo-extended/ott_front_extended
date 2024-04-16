import { Button, Typography } from 'antd';
import React from 'react';

import styles from '../../Profile.module.css';

export const ProfileCardTitle: React.FC = () => (
  <div>
    <Typography.Title level={5}>프로필</Typography.Title>
    <Button
      className={styles.postCards}
      onClick={() => alert('TODO')}
      type="primary"
      // TODO: Implement the onClick event
    >
      수정
    </Button>
  </div>
);

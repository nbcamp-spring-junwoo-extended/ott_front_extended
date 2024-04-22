import { Image, Space, Typography } from 'antd';
import React from 'react';

import { calculateEndDate } from '../../utils/dateUtils.ts';
import styles from './Auth.module.css';
import { LoginForm } from './components/LoginForm.tsx';

const LoginScreen: React.FC = () => (
  <Space className={styles.section}>
    <div className={styles.container}>
      <Space className={styles.header} direction="vertical">
        <Image
          preview={false}
          src="https://github.com/nbcamp-spring-junwoo/orz/assets/48433827/02eaa19f-e5fa-4d30-9c41-fc86488b33f8"
          width={200}
        />
        <Typography.Text className={styles.text}>이㈜누 주식회사{calculateEndDate()}</Typography.Text>
      </Space>
      <LoginForm />
    </div>
  </Space>
);

export default LoginScreen;

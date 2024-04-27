import { Image, Skeleton, Space, Typography } from 'antd';
import React, { useState } from 'react';

import { calculateCommerceDate } from '../../utils/dateUtils.ts';
import styles from './Auth.module.css';
import { LoginForm } from './components/LoginForm.tsx';

const LoginScreen: React.FC = () => {
  const [isLogoLoaded, setIsLogoLoaded] = useState(false);

  return (
    <Space className={styles.container} direction="vertical">
      <Space className={styles.header} direction="vertical">
        {!isLogoLoaded && <Skeleton.Image active style={{ height: '12rem', width: '12rem' }} />}
        <Image
          fallback="https://via.placeholder.com/200"
          hidden
          onLoad={() => setIsLogoLoaded(true)}
          preview={false}
          src="https://github.com/nbcamp-spring-junwoo/orz/assets/48433827/8ef8251e-4199-46b2-846b-de67d10978d1"
          style={{ display: isLogoLoaded ? 'block' : 'none' }}
          width="12rem"
        />
        <Typography.Title className={styles.text} level={3}>
          이㈜누 주식회사{calculateCommerceDate()}
        </Typography.Title>
      </Space>
      <LoginForm />
    </Space>
  );
};

export default LoginScreen;

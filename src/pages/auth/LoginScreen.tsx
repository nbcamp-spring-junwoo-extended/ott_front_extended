import { FormProps, Image, Space, Typography } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { LoginFormValues, login } from '../../core/apis/authApi.ts';
import { userActions } from '../../core/reducer/userSlice.ts';
import { calculateEndDate } from '../../utils/dateUtil.ts';
import styles from './Auth.module.css';
import { LoginForm } from './components/LoginForm.tsx';

interface LoginScreenProps {
  messageApi: MessageInstance;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ messageApi }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish: FormProps<LoginFormValues>['onFinish'] = async (values) => {
    console.log(values);
    setIsLoading(true);
    try {
      const response = await login(values);
      dispatch(
        userActions.login({
          token: response.headers?.authorization?.slice(7),
          username: values.username,
        }),
      );
      messageApi.open({ content: '로그인 성공', type: 'success' });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        messageApi.error(e.message || '로그인 실패');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Space className={styles.section}>
      <div className={styles.container}>
        <Space className={styles.header} direction="vertical">
          <Image
            preview={false}
            src="https://private-user-images.githubusercontent.com/48433827/317222121-02eaa19f-e5fa-4d30-9c41-fc86488b33f8.svg?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTM1Mjg5NTcsIm5iZiI6MTcxMzUyODY1NywicGF0aCI6Ii80ODQzMzgyNy8zMTcyMjIxMjEtMDJlYWExOWYtZTVmYS00ZDMwLTljNDEtZmM4NjQ4OGIzM2Y4LnN2Zz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA0MTklMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNDE5VDEyMTA1N1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTBmZDgwMWMyM2QwZjhiZGIxOGQ4ZWEzZDE1YjkxMTlhMDkwMzkwOTE3ZTE2N2VjOWUxN2NmODExNzJmNmI0MjEmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.1kQA2o6aXm3FaeuVbVxri5toOhB7AM6ivKiB_NmNfQM"
            style={{ maxWidth: 200, minWidth: 100 }}
          />
          <Typography.Text className={styles.text}>이㈜누 주식회사{calculateEndDate()}</Typography.Text>
        </Space>
        <LoginForm loading={isLoading} onFinish={onFinish} />
      </div>
    </Space>
  );
};

export default LoginScreen;

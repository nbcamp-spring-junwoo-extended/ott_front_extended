import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Space } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { LoginForm, login } from '../../core/apis/authApi.ts';
import { userActions } from '../../core/reducer/userSlice.ts';

const formItemLayout = {
  labelCol: {
    sm: { span: 6 },
    xs: { span: 24 },
  },
  wrapperCol: {
    sm: { span: 14 },
    xs: { span: 24 },
  },
};

interface LoginScreenProps {
  messageApi: MessageInstance;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ messageApi }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const onFinish: FormProps<LoginForm>['onFinish'] = async (values) => {
    try {
      setIsLoading(true);
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

  const loginInitialValues = import.meta.env.DEV
    ? { password: 'password', username: 'user1' }
    : { password: '', username: '' };

  return (
    <Form
      {...formItemLayout}
      className="auth-form"
      initialValues={loginInitialValues}
      name="normal_login"
      onFinish={onFinish}
    >
      <Form.Item label="username" name="username" rules={[{ message: 'Please input your Username!', required: true }]}>
        <Input
          placeholder="Username"
          prefix={<UserOutlined className="site-form-item-icon" />}
          style={{ display: 'flex' }}
        />
      </Form.Item>
      <Form.Item label="password" name="password" rules={[{ message: 'Please input your Password!', required: true }]}>
        <Input
          placeholder="Password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          style={{ display: 'flex' }}
          type="password"
        />
      </Form.Item>

      <Form.Item>
        <Space direction="horizontal" size="large">
          <Button className="login-form-button" htmlType="submit" loading={isLoading} type="primary">
            Log in
          </Button>
          <Link to="/signup">Sign up</Link>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;

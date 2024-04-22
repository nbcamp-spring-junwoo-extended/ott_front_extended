import { LockOutlined, MehOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, FormProps, Input, Typography, message } from 'antd';
import axios from 'axios';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { LoginFormValues, login } from '../../../core/apis/authApi.ts';
import { userActions } from '../../../core/reducer/userSlice.ts';
import styles from '../Auth.module.css';

export const LoginForm: React.FC = () => {
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
      message.open({ content: '로그인 성공', type: 'success' });
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error(e.message || '로그인 실패');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form
      initialValues={{
        remember: true,
      }}
      layout="vertical"
      name="normal_login"
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[
          {
            message: 'Please input your username!',
            required: true,
          },
        ]}
      >
        <Input placeholder="Username" prefix={<MehOutlined spin />} />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            message: 'Please input your Password!',
            required: true,
          },
        ]}
      >
        <Input.Password placeholder="Password" prefix={<LockOutlined />} type="password" />
      </Form.Item>

      <Form.Item>
        <Form.Item name="remember" noStyle valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form.Item>

      <Form.Item style={{ marginBottom: '0px' }}>
        <Button htmlType="submit" loading={isLoading} type="primary">
          Log in
        </Button>
        <div className={styles.footer}>
          <Typography.Text className={styles.text}>Don&apos;t have an account?</Typography.Text>{' '}
          <Link to="/signup">Sign up now</Link>
        </div>
      </Form.Item>
    </Form>
  );
};

import { LockOutlined, MehOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input, Typography } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

import { LoginFormValues } from '../../../core/apis/authApi.ts';
import styles from '../Auth.module.css';

type LoginFormProps = {
  loading: boolean;
  onFinish: (values: LoginFormValues) => void;
};

export const LoginForm: React.FC<LoginFormProps> = ({ loading, onFinish }) => (
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
      <a className={styles.forgotPassword}>Forgot password?</a>
    </Form.Item>

    <Form.Item style={{ marginBottom: '0px' }}>
      <Button htmlType="submit" loading={loading} type="primary">
        Log in
      </Button>
      <div className={styles.footer}>
        <Typography.Text className={styles.text}>Don't have an account?</Typography.Text>{' '}
        <Link to="/signup">Sign up now</Link>
      </div>
    </Form.Item>
  </Form>
);

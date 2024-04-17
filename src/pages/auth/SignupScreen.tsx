import { CalendarOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Divider, Form, FormProps, Input, Space } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { signup } from '../../core/apis/authApi.ts';

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

export type SignupForm = {
  born: string;
  email: string;
  password: string;
  username: string;
};

interface SignupScreenProps {
  messageApi: MessageInstance;
}

const SignupScreen: React.FC<SignupScreenProps> = ({ messageApi }) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onFinish: FormProps<SignupForm>['onFinish'] = (values) => {
    setIsLoading(true);

    signup(values)
      .then(() =>
        messageApi.open({
          content: '회원가입 성공',
          type: 'success',
        }),
      )
      .then(() => navigate('/'))
      .catch((reason) =>
        messageApi.open({
          content: reason?.response?.data?.message,
          type: 'error',
        }),
      )
      .finally(() => setIsLoading(false));

    setIsLoading(false);
  };

  const initialValues = import.meta.env.DEV
    ? {
        born: '1994-11-03',
        email: 'user1@email.com',
        password: 'password',
        username: 'user1',
      }
    : {
        born: '',
        email: '',
        password: '',
        username: '',
      };

  return (
    <Form
      {...formItemLayout}
      className="auth-form"
      initialValues={initialValues}
      name="normal_login"
      onFinish={onFinish}
    >
      <Form.Item label="Username" name="username" rules={[{ message: 'Please input your Username!', required: true }]}>
        <Input placeholder="Username" prefix={<UserOutlined className="site-form-item-icon" />} />
      </Form.Item>

      <Form.Item label="Password" name="password" rules={[{ message: 'Please input your Password!', required: true }]}>
        <Input placeholder="Password" prefix={<LockOutlined className="site-form-item-icon" />} type="password" />
      </Form.Item>

      <Form.Item label="Email" name="email" rules={[{ message: 'Please input your Email!', required: true }]}>
        <Input placeholder="Email" prefix={<MailOutlined className="site-form-item-icon" />} type="email" />
      </Form.Item>

      <Form.Item label="Birthday" name="born" rules={[{ message: 'Please input your Birthday!', required: true }]}>
        <Input prefix={<CalendarOutlined className="site-form-item-icon" />} type="date" />
      </Form.Item>

      <Form.Item>
        <Space align="center" split={<Divider type="vertical" />}>
          <Button className="login-form-button" htmlType="submit" loading={isLoading} type="primary">
            Sign up
          </Button>
          <Link to="/">back</Link>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default SignupScreen;

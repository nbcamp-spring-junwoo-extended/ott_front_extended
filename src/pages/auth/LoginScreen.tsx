import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Space } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { LoginForm, login } from '../../core/apis/authApi.ts';
import { userActions } from '../../reducer/userSlice.ts';

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

const LoginScreen: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish: FormProps<LoginForm>['onFinish'] = async (values) => {
    login(values).then((response) => {
      dispatch(
        userActions.login({
          token: response.headers?.authorization?.slice(7),
          username: values.username,
        }),
      );
      navigate('/');
    });
  };

  return (
    <Form
      {...formItemLayout}
      className="auth-form"
      initialValues={{ password: 'password', username: 'user1' }}
      name="normal_login"
      onFinish={onFinish}
    >
      <Form.Item
        label="username"
        name="username"
        rules={[{ message: 'Please input your Username!', required: true }]}
      >
        <Input placeholder="Username" prefix={<UserOutlined className="site-form-item-icon" />} />
      </Form.Item>
      <Form.Item
        label="password"
        name="password"
        rules={[{ message: 'Please input your Password!', required: true }]}
      >
        <Input
          placeholder="Password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
        />
      </Form.Item>

      <Form.Item>
        <Space direction="horizontal" size="large">
          <Button className="login-form-button" htmlType="submit" type="primary">
            Log in
          </Button>
          <Link to="/signup">Sign up</Link>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default LoginScreen;

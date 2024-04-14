import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Space } from 'antd';
import { MessageInstance } from 'antd/es/message/interface';
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

interface LoginScreenProps {
  messageApi: MessageInstance;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ messageApi }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish: FormProps<LoginForm>['onFinish'] = async (values) => {
    console.log(messageApi);
    login(values)
      .then((response) => {
        dispatch(
          userActions.login({
            token: response.headers?.authorization?.slice(7),
            username: values.username,
          }),
        );
        return response;
      })
      .then(() => messageApi.open({ content: '로그인 성공', type: 'success' }))
      .catch((reason) =>
        messageApi.open({ content: reason?.response?.data?.message, type: 'error' }),
      );
  };

  return (
    <Form
      {...formItemLayout}
      className="auth-form"
      initialValues={{ password: 'password', username: 'user1' }}
      justify="center"
      name="normal_login"
      onFinish={onFinish}
    >
      <Form.Item
        label="username"
        name="username"
        rules={[{ message: 'Please input your Username!', required: true }]}
      >
        <Input
          placeholder="Username"
          prefix={<UserOutlined className="site-form-item-icon" />}
          style={{ display: 'flex' }}
        />
      </Form.Item>
      <Form.Item
        label="password"
        name="password"
        rules={[{ message: 'Please input your Password!', required: true }]}
      >
        <Input
          placeholder="Password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          style={{ display: 'flex' }}
          type="password"
        />
      </Form.Item>

      <Form.Item wrapperCol>
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

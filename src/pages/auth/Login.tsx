import { Button, Form, FormProps, Input, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import React from 'react';
import { login, LoginForm } from '../../core/apis/authApi.ts';
import { userActions } from '../../reducer/userSlice.ts';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 14 },
  },
};

const Login: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish: FormProps<LoginForm>['onFinish'] = async (values) => {
    login(values).then((response) => {
      dispatch(
        userActions.login({
          username: values.username,
          token: response.headers.authorization,
        }),
      );
      navigate('/');
    });
  };

  return (
    <Form
      {...formItemLayout}
      name="normal_login"
      className="auth-form"
      initialValues={{ username: 'user1', password: 'password' }}
      onFinish={onFinish}
    >
      <Form.Item
        label="username"
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
        label="password"
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item>
        <Space direction="horizontal" size="large">
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          <Link to="/signup">Sign up</Link>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default Login;

import { Button, Form, FormProps, Input, Space } from 'antd';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { login } from '../../core/apis/authApi.ts';
import { userActions } from '../../reducer/userSlice.ts';

export type LoginForm = {
  username: string;
  password: string;
};

const Login = () => {
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
      name="normal_login"
      className="login-form"
      initialValues={{ username: 'user1', password: 'password' }}
      onFinish={onFinish}
    >
      <Form.Item
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
        />
      </Form.Item>
      <Form.Item
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

import { CalendarOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { signup } from '../../core/apis/authApi.ts';

export type SignupForm = {
  username: string;
  password: string;
  email: string;
  born: string;
};

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

const SignupScreen = () => {
  const navigate = useNavigate();
  const onFinish: FormProps<SignupForm>['onFinish'] = async (values) => {
    await signup(values);
    navigate('/');
  };

  return (
    <Form
      {...formItemLayout}
      label=""
      name="normal_login"
      className="auth-form"
      initialValues={{
        username: 'user1',
        password: 'password',
        email: 'user1@email.com',
        born: '1994-11-03',
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input your Email!' }]}
      >
        <Input
          prefix={<MailOutlined className="site-form-item-icon" />}
          type="email"
          placeholder="Email"
        />
      </Form.Item>

      <Form.Item
        label="Birthday"
        name="born"
        rules={[{ required: true, message: 'Please input your Birthday!' }]}
      >
        <Input prefix={<CalendarOutlined className="site-form-item-icon" />} type="date" />
      </Form.Item>

      <Form.Item>
        <Space direction="horizontal" size="large">
          <Button type="primary" htmlType="submit" className="login-form-button">
            Sign up
          </Button>
          <Link to="/">back</Link>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default SignupScreen;

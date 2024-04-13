import { CalendarOutlined, LockOutlined, MailOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Form, FormProps, Input, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';

import { signup } from '../../core/apis/authApi.ts';

export type SignupForm = {
  born: string;
  email: string;
  password: string;
  username: string;
};

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

const SignupScreen = () => {
  const navigate = useNavigate();
  const onFinish: FormProps<SignupForm>['onFinish'] = async (values) => {
    await signup(values);
    navigate('/');
  };

  return (
    <Form
      {...formItemLayout}
      className="auth-form"
      initialValues={{
        born: '1994-11-03',
        email: 'user1@email.com',
        password: 'password',
        username: 'user1',
      }}
      label=""
      name="normal_login"
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        rules={[{ message: 'Please input your Username!', required: true }]}
      >
        <Input placeholder="Username" prefix={<UserOutlined className="site-form-item-icon" />} />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ message: 'Please input your Password!', required: true }]}
      >
        <Input
          placeholder="Password"
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
        />
      </Form.Item>

      <Form.Item
        label="Email"
        name="email"
        rules={[{ message: 'Please input your Email!', required: true }]}
      >
        <Input
          placeholder="Email"
          prefix={<MailOutlined className="site-form-item-icon" />}
          type="email"
        />
      </Form.Item>

      <Form.Item
        label="Birthday"
        name="born"
        rules={[{ message: 'Please input your Birthday!', required: true }]}
      >
        <Input prefix={<CalendarOutlined className="site-form-item-icon" />} type="date" />
      </Form.Item>

      <Form.Item>
        <Space direction="horizontal" size="large">
          <Button className="login-form-button" htmlType="submit" type="primary">
            Sign up
          </Button>
          <Link to="/">back</Link>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default SignupScreen;

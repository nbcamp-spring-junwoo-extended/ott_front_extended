import './App.css';

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout } from 'antd';
import { Content, Header } from 'antd/es/layout/layout';
import Sider from 'antd/es/layout/Sider';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import LoginScreen from './pages/auth/LoginScreen.tsx';
import LogoutScreen from './pages/auth/LogoutScreen.tsx';
import SignupScreen from './pages/auth/SignupScreen.tsx';
import Sidebar from './pages/components/Sidebar.tsx';
import Topbar from './pages/components/Topbar.tsx';
import HomeScreen from './pages/HomeScreen.tsx';
import ProfileScreen from './pages/profile/ProfileScreen.tsx';
import SubscriptionScreen from './pages/subscription/SubscriptionScreen.tsx';
import { UserSliceType } from './reducer/userSlice.ts';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user: UserSliceType = useSelector((state) => state.user);

  const dispatch = useDispatch();

  if (!user.isLogin) {
    return (
      <Layout className="default">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/logout" element={<LogoutScreen />} />
          <Route path="/signup" element={<SignupScreen />} />
        </Routes>
      </Layout>
    );
  }

  return (
    <Layout className="default">
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        className="sider"
      >
        <Sidebar />
      </Sider>

      <Button
        type="text"
        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)}
        className="sider-trigger"
      />

      <Layout>
        <Routes>
          <Route path="/billing" element={<BillingCheckout />} />
        </Routes>

        <Header className="header">
          <Topbar />
        </Header>

        <Content className="content">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/subscribe" element={<SubscriptionScreen />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

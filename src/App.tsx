import React, { useEffect, useState } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { Button, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { useDispatch, useSelector } from 'react-redux';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import './App.css';
import LoginScreen from './pages/auth/LoginScreen.tsx';
import Sidebar from './pages/components/Sidebar.tsx';
import Topbar from './pages/components/Topbar.tsx';
import SignupScreen from './pages/auth/SignupScreen.tsx';
import LogoutScreen from './pages/auth/LogoutScreen.tsx';
import HomeScreen from './pages/HomeScreen.tsx';
import { userActions, UserSliceType } from './reducer/userSlice.ts';
import ProfileScreen from './pages/profile/ProfileScreen.tsx';
import SubscriptionScreen from './pages/subscription/SubscriptionScreen.tsx';

const App: React.FC = () => {
  const user: UserSliceType = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!user.isLogin) {
      dispatch(userActions.checkLogin());
    }
  }, [user.isLogin]);

  if (!user.isLogin) {
    return (
      <Layout className="default">
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/logout" element={<Link to="/" />} />
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
        <Header className="header">
          <Topbar />
        </Header>
        <Content className="content">
          <Routes>
            <Route path="/" element={<HomeScreen />} />
            <Route path="/logout" element={<LogoutScreen />} />
            <Route path="/profile" element={<ProfileScreen />} />
            <Route path="/subscribe" element={<SubscriptionScreen />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

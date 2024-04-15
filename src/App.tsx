import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Layout, message } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import './App.css';
import { UserSliceType } from './core/reducer/userSlice.ts';
import HomeScreen from './pages/HomeScreen.tsx';
import LoginScreen from './pages/auth/LoginScreen.tsx';
import LogoutScreen from './pages/auth/LogoutScreen.tsx';
import SignupScreen from './pages/auth/SignupScreen.tsx';
import Sidebar from './pages/components/Sidebar.tsx';
import Topbar from './pages/components/Topbar.tsx';
import NotificationScreen from './pages/notification/NotificationScreen.tsx';
import ProfileScreen from './pages/profile/ProfileScreen.tsx';
import { CreateCardSuccessScreen } from './pages/profile/billing/CreateCardSuccessScreen.tsx';
import RankingScreen from './pages/ranking/RankingScreen.tsx';
import VideoSearchScreen from './pages/search/VideoSearchScreen.tsx';
import SubscriptionScreen from './pages/subscription/SubscriptionScreen.tsx';
import VideoScreen from './pages/video/VideoScreen.tsx';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const user: UserSliceType = useSelector((state) => state.user);
  const [messageApi, contextHolder] = message.useMessage();

  if (!user.isLogin) {
    return (
      <>
        {contextHolder}
        <Layout className="default" style={{ alignItems: 'center' }}>
          <Routes>
            <Route element={<LoginScreen messageApi={messageApi} />} path="/" />
            <Route element={<LogoutScreen />} path="/logout" />
            <Route element={<SignupScreen messageApi={messageApi} />} path="/signup" />
          </Routes>
        </Layout>
      </>
    );
  }

  return (
    <>
      {contextHolder}

      <Layout className="default">
        <Sider className="sider" collapsed={collapsed} collapsible theme="light" trigger={null}>
          <Sidebar />
        </Sider>

        <Button
          className="sider-trigger"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          type="text"
        />

        <Layout>
          <Header className="header">
            <Topbar />
          </Header>

          <Content className="content">
            <Routes>
              <Route element={<HomeScreen />} path="/" />
              <Route element={<VideoScreen />} path="/videos/:id" />
              <Route element={<ProfileScreen />} path="/profile" />
              <Route element={<CreateCardSuccessScreen />} path="/profile/newcard/success" />
              <Route element={<RankingScreen />} path="/ranking" />
              <Route element={<NotificationScreen />} path="/notification" />
              <Route element={<VideoSearchScreen />} path="/search" />
              <Route element={<SubscriptionScreen />} path="/subscribe" />
            </Routes>
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default App;

import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Button, Flex, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { useSelector } from 'react-redux';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import './App.css';
import Login from './pages/auth/Login.tsx';
import Sidebar from './components/Sidebar.tsx';
import Topbar from './components/Topbar.tsx';
import Signup from './pages/auth/Signup.tsx';
import Logout from './pages/auth/Logout.tsx';
import Home from './pages/home.tsx';
import { UserSliceType } from './reducer/userSlice.ts';

const App: React.FC = () => {
  const user: UserSliceType = useSelector((state) => state.user);
  const [collapsed, setCollapsed] = useState(false);

  console.log(user.isLogin);

  if (!user.isLogin) {
    return (
      <Layout className="default">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
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
          <Flex>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/logout" element={<Logout />} />
            </Routes>
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

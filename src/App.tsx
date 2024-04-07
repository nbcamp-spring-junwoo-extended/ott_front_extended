import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Button, Flex, Layout } from 'antd';
import Sider from 'antd/es/layout/Sider';
import { Content, Header } from 'antd/es/layout/layout';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

import Login from './pages/auth/Login.tsx';
import Home from './pages/home.tsx';
import './App.css';
import Sidebar from './components/Sidebar.tsx';
import Topbar from './components/Topbar.tsx';
import Signup from './pages/auth/Signup.tsx';
import Logout from './pages/auth/Logout.tsx';

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout
      className="swiper-pagination-progressbar-fill"
      style={{ width: '100vw', overflow: 'auto' }}
    >
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
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Flex>
        </Content>
      </Layout>
    </Layout>
  );
};

export default App;

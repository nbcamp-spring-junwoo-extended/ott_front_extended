import {
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  RiseOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Flex, Menu } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userActions } from '../../reducer/userSlice.ts';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleNavigate = (e) => {
    switch (e.key) {
      case '/logout':
        dispatch(userActions.clearUser());
        navigate('/');
        break;
      default:
        navigate(e.key);
        break;
    }
  };

  const items = [
    {
      icon: <HomeOutlined />,
      key: '/',
      label: 'Home',
    },
    {
      icon: <BellOutlined />,
      key: '/notification',
      label: 'Notification',
    },
    {
      icon: <SearchOutlined />,
      key: '/search',
      label: 'Search',
    },
    {
      icon: <RiseOutlined />,
      key: '/ranking',
      label: 'Ranking',
    },
    {
      icon: <UserOutlined />,
      key: '/profile',
      label: 'Profile',
    },
    {
      icon: <LogoutOutlined style={{ color: 'red' }} />,
      key: '/logout',
      label: <span style={{ color: 'red' }}>Logout</span>,
    },
  ];

  return (
    <div>
      <Flex align="center" justify="center">
        <div>Sidebar</div>
      </Flex>

      <Menu
        onClick={(e) => handleNavigate(e)}
        mode="inline"
        className="menu-bar"
        defaultSelectedKeys={['/']}
        items={items}
      />
    </div>
  );
};

export default Sidebar;

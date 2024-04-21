import {
  BellOutlined,
  HomeOutlined,
  LogoutOutlined,
  RiseOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Flex, Menu } from 'antd';
import { ItemType } from 'antd/es/menu/hooks/useItems';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userActions } from '../../core/reducer/userSlice.ts';

const items: ItemType[] = [
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

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNavigate = ({ key }: { key: string }) => {
    switch (key) {
      case '/logout':
        dispatch(userActions.clearUser());
        navigate('/');
        break;
      default:
        navigate(key);
        break;
    }
  };

  return (
    <div>
      <Flex align="center" justify="center">
        <div>Sidebar</div>
      </Flex>

      <Menu className="menu-bar" defaultSelectedKeys={['/']} items={items} mode="inline" onClick={handleNavigate} />
    </div>
  );
};

export default Sidebar;

import {
  BellOutlined,
  HeartOutlined,
  HomeOutlined,
  LogoutOutlined,
  RiseOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Flex, Menu, MenuProps } from 'antd';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { userActions } from '../../core/reducer/userSlice.ts';

const items: MenuProps['items'] = [
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
    icon: <HeartOutlined />,
    key: '/like',
    label: 'Like',
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

      <Menu className="menu-bar" items={items} mode="inline" onClick={handleNavigate} />
    </div>
  );
};

export default Sidebar;

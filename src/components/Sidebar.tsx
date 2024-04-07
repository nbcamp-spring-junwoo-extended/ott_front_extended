import React from 'react';
import { Flex, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import {
  HomeOutlined,
  LogoutOutlined,
  RiseOutlined,
  SearchOutlined,
  UserOutlined,
} from '@ant-design/icons';

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const handleNavigate = (e) => {
    if (e.key) {
      navigate(e.key);
    }
  };

  const items = [
    {
      icon: <HomeOutlined />,
      key: '/',
      label: 'Home',
    },
    {
      icon: <SearchOutlined />,
      key: '/search',
      label: 'Search',
    },
    {
      icon: <RiseOutlined />,
      key: '/top10',
      label: 'Top 10',
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
        defaultselectedkeys={['1']}
        items={items}
      />
    </div>
  );
};

export default Sidebar;

import { Flex, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import styles from './Layout.module.css';

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  const handleTitleClick = () => navigate('/');

  return (
    <Flex>
      <Typography.Title className={styles.titleText} onClick={handleTitleClick} type="warning">
        이㈜누 주식회사
      </Typography.Title>
    </Flex>
  );
};

export default Topbar;

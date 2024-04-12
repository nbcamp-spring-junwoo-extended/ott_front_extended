import { Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="headbar">
      <Typography.Title level={1} className="topbar" onClick={() => navigate('/')} type="warning">
        이㈜누 주식회사
      </Typography.Title>
    </div>
  );
};

export default Topbar;

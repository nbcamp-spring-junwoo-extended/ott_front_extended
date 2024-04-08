import React from 'react';
import { Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const Topbar: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="headbar">
      <Typography.Title
        level={1}
        className="topbar"
        onClick={() => navigate('/')}
        type="warning"
      >
        이㈜누 주식회사 상폐 25일 전
      </Typography.Title>
    </div>
  );
};

export default Topbar;

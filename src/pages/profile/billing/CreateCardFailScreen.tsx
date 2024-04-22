import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

export const CreateCardFailScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleNavigateClick = () => {
    navigate('/profile');
  };

  return (
    <Result
      extra={[
        <Button key="console" onClick={handleNavigateClick} type="primary">
          확인
        </Button>,
      ]}
      status="error"
      subTitle={searchParams.get('code') ?? ''}
      title={searchParams.get('message') ?? ''}
    />
  );
};

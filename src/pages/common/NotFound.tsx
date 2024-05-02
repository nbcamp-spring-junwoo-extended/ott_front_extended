import { Button, Result } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <Result
      extra={
        <Button onClick={handleHomeClick} type="primary">
          Back to Home.
        </Button>
      }
      status="404"
      subTitle="Sorry, the page you visited does not exist."
      title="404"
    />
  );
};

export default NotFound;

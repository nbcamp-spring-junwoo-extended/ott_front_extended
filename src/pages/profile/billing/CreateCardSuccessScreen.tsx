import { Button, Result, message } from 'antd';
import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { postBillingKey } from '../../../core/apis/subscriptionApi.ts';

export const CreateCardSuccessScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const customerKey = searchParams.get('customerKey') ?? '';
    const authKey = searchParams.get('authKey') ?? '';

    if (!customerKey || !authKey) {
      return;
    }

    postBillingKey(customerKey, authKey)
      .then(() => navigate('/profile'))
      .catch((error) => message.error(error));
  }, [navigate, searchParams]);

  const handleNavigateClick = () => {
    navigate('/');
  };

  return (
    <Result
      extra={[
        <Button key="console" onClick={handleNavigateClick} type="primary">
          홈으로 이동
        </Button>,
      ]}
      status="success"
      title="카드 등록 성공!"
    />
  );
};

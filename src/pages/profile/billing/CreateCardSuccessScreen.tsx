import React, { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import { postBillingKey } from '../../../core/apis/subscriptionApi.ts';

export const CreateCardSuccessScreen: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    postBillingKey(searchParams.get('customerKey'), searchParams.get('authKey')).then(
      (response) => {
        console.log(response);
        if (response.status.toString().startsWith('2')) {
          navigate('/profile');
        }
      },
    );
  }, []);

  return <>카드 등록 성공</>;
};

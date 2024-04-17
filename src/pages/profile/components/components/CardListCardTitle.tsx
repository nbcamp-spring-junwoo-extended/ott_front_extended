import { useQuery } from '@tanstack/react-query';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { Button, Typography, message } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { myCustomerKey } from '../../../../core/apis/userApi.ts';
import { UserCustomerKey } from '../../../../core/types/user.ts';
import style from '../../Profile.module.css';

const CLIENT_KEY = import.meta.env.VITE_TOSSPAYMENTS_CLIENTKEY;

const usePaymentWidget = (clientKey: string) =>
  useQuery({
    queryFn: () =>
      // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
      loadTossPayments(clientKey),
    queryKey: ['#payment-widget', clientKey],
  });
export const CardListCardTitle: React.FC = () => {
  const [customerKey, setCustomerKey] = useState<UserCustomerKey>('');
  const { data: paymentSdk } = usePaymentWidget(CLIENT_KEY);
  const [isCreateCardVisible, setIsCreateCardVisible] = useState<boolean>(false);

  useEffect(() => {
    const fetchCustomerKey = async () => {
      try {
        const response = await myCustomerKey();
        setCustomerKey(response.data.data);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          message.error(error.message);
        }
        console.error(error);
      }
    };

    fetchCustomerKey().then();
  }, []);

  useEffect(() => {
    if (paymentSdk == null || !isCreateCardVisible) {
      return;
    }

    paymentSdk
      .requestBillingAuth('카드', {
        customerKey,
        failUrl: `${window.location.origin}/profile/card/fail`,
        successUrl: `${window.location.origin}/profile/newcard/success`,
      })
      .catch(() => setIsCreateCardVisible(false));
  }, [paymentSdk, isCreateCardVisible, customerKey]);

  return (
    <>
      <Typography.Title level={5}>카드</Typography.Title>
      <Button className={style.postCards} onClick={() => setIsCreateCardVisible(true)} type="primary">
        등록
      </Button>
    </>
  );
};

import { useQuery } from '@tanstack/react-query';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { Button, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import style from '../../Profile.module.css';

const CLIENT_KEY = import.meta.env.VITE_TOSSPAYMENTS_CLIENTKEY;
const CUSTOMER_KEY = '12341234';

const usePaymentWidget = (clientKey: string) =>
  useQuery({
    queryFn: () =>
      // ------  결제위젯 초기화 ------
      // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
      loadTossPayments(clientKey),
    queryKey: ['#payment-widget', clientKey],
  });
export const CardListCardTitle: React.FC = () => {
  const { data: paymentSdk } = usePaymentWidget(CLIENT_KEY);
  const [isCreateCardVisible, setIsCreateCardVisible] = useState<boolean>(false);

  useEffect(() => {
    if (paymentSdk == null || !isCreateCardVisible) {
      return;
    }

    paymentSdk
      .requestBillingAuth('카드', {
        customerKey: CUSTOMER_KEY,
        failUrl: `${window.location.origin}/profile/card/fail`,
        successUrl: `${window.location.origin}/profile/newcard/success`,
      })
      .catch(() => setIsCreateCardVisible(false));
  }, [paymentSdk, isCreateCardVisible]);

  return (
    <div>
      <Typography.Title level={5}>카드</Typography.Title>
      <Button className={style.postCards} onClick={() => setIsCreateCardVisible(true)} type="primary">
        등록
      </Button>
    </div>
  );
};

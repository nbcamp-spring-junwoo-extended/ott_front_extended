import { useQuery } from '@tanstack/react-query';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { Button, Typography } from 'antd';
import React, { useState } from 'react';

import style from '../../Profile.module.css';
import useCardListCardTitle from './useCardListCardTitle.tsx';

const CLIENT_KEY = import.meta.env.VITE_TOSSPAYMENTS_CLIENTKEY;

const usePaymentWidget = (clientKey: string) =>
  useQuery({
    queryFn: () =>
      // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
      loadTossPayments(clientKey),
    queryKey: ['#payment-widget', clientKey],
  });

export const CardListCardTitle: React.FC = () => {
  const { data: paymentSdk } = usePaymentWidget(CLIENT_KEY);
  const [isCreateCardVisible, setIsCreateCardVisible] = useState<boolean>(false);

  useCardListCardTitle({
    paymentSdk,
    stateCreateCardVisible: { isCreateCardVisible, setIsCreateCardVisible },
  });

  const handleOnClick = () => setIsCreateCardVisible(true);

  return (
    <>
      <Typography.Title level={5}>카드</Typography.Title>
      <Button className={style.postCards} onClick={handleOnClick} type="primary">
        등록
      </Button>
      <div className="payment-widget" />
    </>
  );
};

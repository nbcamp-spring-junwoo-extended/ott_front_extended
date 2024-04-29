import { useQuery } from '@tanstack/react-query';
import { loadTossPayments } from '@tosspayments/payment-sdk';
import { message } from 'antd';
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { myCustomerKey } from '../../core/apis/userApi.ts';

const CLIENT_KEY = import.meta.env.VITE_TOSSPAYMENTS_CLIENTKEY;

const usePaymentWidget = (clientKey: string) =>
  useQuery({
    queryFn: () =>
      // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
      loadTossPayments(clientKey),
    queryKey: ['#payment-widget', clientKey],
  });

const useTosspaymentsWidget = () => {
  const [isCreateCardVisible, setIsCreateCardVisible] = useState<boolean>(false);
  const { data: paymentSdk } = usePaymentWidget(CLIENT_KEY);

  const fetchWidget = useCallback(async () => {
    if (paymentSdk == null || !isCreateCardVisible) {
      return;
    }

    try {
      const customerKeyResponse = await myCustomerKey();
      const { customerKey } = customerKeyResponse.data.data;
      await paymentSdk.requestBillingAuth('카드', {
        customerKey,
        failUrl: `${window.location.origin}/profile/newcard/fail`,
        successUrl: `${window.location.origin}/profile/newcard/success`,
      });
    } catch (error) {
      setIsCreateCardVisible(false);
      if (axios.isAxiosError(error)) {
        message.error(error.message);
      }
      console.error(error);
    }
  }, [isCreateCardVisible, paymentSdk]);

  useEffect(() => {
    fetchWidget().then();
  }, [fetchWidget]);

  return { setIsCreateCardVisible };
};

export default useTosspaymentsWidget;

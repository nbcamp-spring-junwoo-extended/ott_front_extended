import { message } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';

import { myCustomerKey } from '../../core/apis/userApi.ts';

type UseCardListCardTitleProps = {
  paymentSdk: any;
  stateCreateCardVisible: {
    isCreateCardVisible: boolean;
    setIsCreateCardVisible: (value: boolean) => void;
  };
};

const useCardListCardTitle = ({
  paymentSdk,
  stateCreateCardVisible: { isCreateCardVisible, setIsCreateCardVisible },
}: UseCardListCardTitleProps) => {
  useEffect(() => {
    if (paymentSdk == null || !isCreateCardVisible) {
      return;
    }

    const fetchWidget = async () => {
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
    };
    fetchWidget().then();
  }, [paymentSdk]);
};

export default useCardListCardTitle;

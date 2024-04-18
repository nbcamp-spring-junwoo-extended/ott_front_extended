import { message } from 'antd';
import axios from 'axios';
import { useEffect } from 'react';

import { myCustomerKey } from '../../../../core/apis/userApi.ts';

type useCardListCardTitleProps = {
  paymentSdk: any;
  stateCreateCardVisible: {
    isCreateCardVisible: boolean;
    setIsCreateCardVisible: (value: boolean) => void;
  };
};

const useCardListCardTitle = ({
  paymentSdk,
  stateCreateCardVisible: { isCreateCardVisible, setIsCreateCardVisible },
}: useCardListCardTitleProps) => {
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
          failUrl: `${window.location.origin}/profile/card/fail`,
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
  }, [paymentSdk, isCreateCardVisible]);
};

export default useCardListCardTitle;

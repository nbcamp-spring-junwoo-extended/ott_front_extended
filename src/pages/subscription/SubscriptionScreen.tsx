import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';

import { getMemberships } from '../../core/apis/membershipApi.ts';
import { PaymentTypes } from '../../core/types/paymentTypes.ts';
import SubscribeCard from './components/SubscribeCard.tsx';

const SubscriptionScreen = () => {
  const [memberships, setMemberships] = useState<PaymentTypes[]>();

  useEffect(() => {
    getMemberships().then((data) => {
      setMemberships(data);
    });
  }, []);

  return (
    <Row gutter={[16, 16]}>
      {memberships?.map((membership, index) => (
        <Col xs={24} xl={12} key={index.toString()}>
          <SubscribeCard subscriptionInfo={membership} />
        </Col>
      ))}
    </Row>
  );
};

export default SubscriptionScreen;

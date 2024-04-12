import { Col, Row } from 'antd';
import { useEffect, useState } from 'react';

import { getMemberships } from '../../core/apis/membershipApi.ts';
import { Payment } from '../../core/types/payment.d.ts';
import SubscribeCard from './components/SubscribeCard.tsx';

const SubscriptionScreen = () => {
  const [memberships, setMemberships] = useState<Payment[]>();

  useEffect(() => {
    getMemberships().then((data) => {
      setMemberships(data);
    });
  }, []);

  return (
    <Row gutter={[16, 16]}>
      {memberships?.map((membership, index) => (
        <Col key={index.toString()} xl={12} xs={24}>
          <SubscribeCard subscriptionInfo={membership} />
        </Col>
      ))}
    </Row>
  );
};

export default SubscriptionScreen;

import { Card, Divider, Typography } from 'antd';
import style from './SubscribeCard.module.css';

export type membershipType = {
  membershipType: string;
  price: number;
  features: string[];
};

const SubscribeCard = ({ subscriptionInfo }) => (
  <Card
    title={subscriptionInfo.membershipType.slice(5)}
    bordered={false}
    onClick={alert}
  >
    <Typography.Title underline strong level={3} className={style.title}>
      {subscriptionInfo.price}₩
    </Typography.Title>
    <Divider />
  </Card>
);

export default SubscribeCard;

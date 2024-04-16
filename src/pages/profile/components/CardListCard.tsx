import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Card, Col, List, Typography } from 'antd';
import React from 'react';

import { CardListCardTitle } from './components/CardListCardTitle.tsx';

interface CardListCardProps {
  cards: {
    cardNickname: string;
    cardNumber: string;
  }[];
}

const CardListCard: React.FC<CardListCardProps> = ({ cards }) => (
  <Card title={<CardListCardTitle />}>
    <List
      bordered
      dataSource={cards}
      renderItem={(item) => (
        <List.Item>
          <Col span={4}>
            <Typography.Text>{item.cardNickname}</Typography.Text>
          </Col>
          <Col span={1}>:</Col>
          <Col span={15}>
            <Typography.Text>{item.cardNumber}</Typography.Text>
          </Col>
          <Col span={2}>
            {/* TODO: onClick event to modify card */}
            <EditOutlined onClick={() => alert('수정 버튼 미구현')} />
          </Col>
          <Col span={2}>
            {/* TODO: onClick event to delete card */}
            <DeleteOutlined onClick={() => alert('삭제 버튼 미구현')} style={{ color: 'red' }} />
          </Col>
        </List.Item>
      )}
    />
  </Card>
);

export default CardListCard;

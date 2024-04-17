import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Col, List, Typography } from 'antd';
import React from 'react';

import { UserCard } from '../../../../core/types/user.ts';

type CardItemProps = {
  card: UserCard;
};

const CardItem: React.FC<CardItemProps> = ({ card }) => (
  <List.Item>
    <Col span={4}>
      <Typography.Text>{card.cardNickname}</Typography.Text>
    </Col>
    <Col span={1}>:</Col>
    <Col span={15}>
      <Typography.Text>{card.cardNumber}</Typography.Text>
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
);

export default CardItem;

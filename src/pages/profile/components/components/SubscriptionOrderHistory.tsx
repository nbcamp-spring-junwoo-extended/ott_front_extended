import { Divider, List, Modal, Space, Typography, message } from 'antd';
import axios from 'axios';
import React, { useCallback, useEffect, useRef, useState } from 'react';

import { getOrderHistory } from '../../../../core/apis/subscriptionApi.ts';
import { OrderHistory } from '../../../../core/types/payment.ts';
import { priceToKRW } from '../../../../utils/currencyUtils.ts';
import { dateArrayToString } from '../../../../utils/dateUtils.ts';

const useOrderHistory = (orderId: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [orderHistory, setOrderHistory] = useState<OrderHistory>({} as OrderHistory);

  const abortController = useRef<AbortController | null>(null);

  const fetchOrderHistory = useCallback(async () => {
    abortController?.current?.abort();
    abortController.current = new AbortController();

    setIsLoading(true);
    try {
      const response = await getOrderHistory(orderId, abortController?.current?.signal);
      setOrderHistory(response.data.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error(e.response?.data?.message ?? e.message ?? '알 수 없는 오류가 발생했습니다.');
      }
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, [orderId]);

  useEffect(() => {
    fetchOrderHistory().then();
  }, [fetchOrderHistory]);

  return { isLoading, orderHistory };
};

type SubscriptionOrderHistoryProps = {
  orderId: string;
  stateOpen: {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const SubscriptionOrderHistory: React.FC<SubscriptionOrderHistoryProps> = ({
  orderId,
  stateOpen: { isModalOpen, setIsModalOpen },
}) => {
  const { orderHistory } = useOrderHistory(orderId);
  const { createdAt, orderItems: items } = orderHistory;

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal onCancel={handleModalClose} onOk={handleModalClose} open={isModalOpen} title={`주문 번호: ${orderId}`}>
      <List
        dataSource={items}
        renderItem={(item) => {
          const { discountedPrice, discountingPrice, itemCode, name, orderItemId, totalPrice } = item;
          return (
            <List.Item key={orderItemId}>
              <List.Item.Meta
                description={
                  <Space direction="vertical">
                    <Typography.Text>{`상품 코드: ${itemCode}`}</Typography.Text>
                    <Typography.Text>{`결제 일: ${dateArrayToString(createdAt)}`}</Typography.Text>
                  </Space>
                }
                title={name}
              />
              <Space direction="vertical">
                <Typography.Text style={{ fontWeight: 'lighter' }}>
                  {`정가: ${priceToKRW(totalPrice)}`}원
                </Typography.Text>
                <Typography.Text style={{ fontWeight: 'lighter' }}>
                  {`할인: ${priceToKRW(discountingPrice)}`}
                </Typography.Text>
                <Divider style={{ margin: 'auto' }} />
                <Typography.Text style={{ fontWeight: 'bolder' }}>
                  {`결제: ${priceToKRW(discountedPrice)}`}원
                </Typography.Text>
              </Space>
            </List.Item>
          );
        }}
      />
    </Modal>
  );
};

export default SubscriptionOrderHistory;

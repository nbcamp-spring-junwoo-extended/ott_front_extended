import { Button, Typography } from 'antd';
import React from 'react';

import useTosspaymentsWidget from '../../../../hooks/user/useTosspaymentsWidget.ts';
import style from '../../Profile.module.css';

export const CardListCardTitle: React.FC = () => {
  const { setIsCreateCardVisible } = useTosspaymentsWidget();

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

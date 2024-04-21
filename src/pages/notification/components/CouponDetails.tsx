import { Card, Modal } from 'antd';
import Meta from 'antd/es/card/Meta';
import React, { useState } from 'react';

import { CouponReadResponseDto } from '../../../core/types/notification.ts';
import CouponDetailsContent from './Components/CouponDetailsContent.tsx';
import CouponDetailsTitle from './Components/CouponDetailsTitle.tsx';
import styles from './CouponDetails.module.css';
import { GetCouponLoadingModal } from './GetCouponLoadingModal.tsx';

type CouponDetailsProps = {
  coupon: CouponReadResponseDto;
};

export const CouponDetails: React.FC<CouponDetailsProps> = ({ coupon }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isCouponIssuedModalVisible, setIsCouponIssuedModalVisible] = useState(false);
  const { description, ...restProps } = coupon;

  const handleModalOpen = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <Card className={styles.card} hoverable onClick={handleModalOpen} type="inner">
        <Meta
          className={styles.bgColor}
          description={<CouponDetailsContent {...restProps} style={{ height: '100%' }} />}
          style={{ display: 'flex', flexDirection: 'column' }}
          title={<CouponDetailsTitle title={description} />}
        />
      </Card>

      {isModalVisible && <GetCouponLoadingModal coupon={coupon} onCancel={handleModalClose} open={isModalVisible} />}

      <Modal
        centered
        onCancel={() => setIsCouponIssuedModalVisible(false)}
        onOk={() => setIsCouponIssuedModalVisible(false)}
        open={isCouponIssuedModalVisible}
        title="쿠폰이 이미 발급되었습니다."
      />
    </>
  );
};

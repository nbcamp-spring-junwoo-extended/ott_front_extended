import { Modal } from 'antd';
import React, { useEffect, useState } from 'react';

type GetCouponLoadingModalProps = {
  isCouponIssued: boolean;
  isPostCouponLoading: boolean;
  onCancel: () => void;
  open: boolean;
};

export const GetCouponLoadingModal: React.FC<GetCouponLoadingModalProps> = ({
  isCouponIssued,
  isPostCouponLoading,
  onCancel,
  open,
}) => {
  const [body, setBody] = useState('쿠폰 발급중...');

  useEffect(() => {
    setBody(isCouponIssued ? '쿠폰이 발급되었습니다.' : '쿠폰 발급에 실패했습니다.');
  }, [isCouponIssued, isPostCouponLoading]);

  return (
    <Modal centered confirmLoading={isPostCouponLoading} onCancel={onCancel} onOk={onCancel} open={open}>
      {body}
    </Modal>
  );
};

import { Button, Divider, Modal, Typography } from 'antd';
import React from 'react';

import { CouponReadResponseDto } from '../../../core/types/notification.ts';
import useCouponRequest from '../hooks/useCouponRequest.ts';

type GetCouponLoadingModalProps = {
  coupon: CouponReadResponseDto;
  onCancel: () => void;
  open: boolean;
};

export const GetCouponLoadingModal: React.FC<GetCouponLoadingModalProps> = ({ coupon, onCancel, open }) => {
  const { couponId, couponType, description, discount, endAt, membershipType, startAt } = coupon;
  const { isRequesting, requestError } = useCouponRequest(couponId);

  let title: string;
  if (isRequesting) {
    title = '쿠폰 발급 중';
  } else {
    title = requestError ? `쿠폰 발급 실패: ${requestError}` : '쿠폰 발급 완료';
  }

  return (
    <Modal
      centered
      confirmLoading={isRequesting}
      footer={
        <Button key="submit" loading={isRequesting} onClick={onCancel} type="primary">
          {isRequesting ? '발급 중...' : '확인'}
        </Button>
      }
      onCancel={onCancel}
      onOk={onCancel}
      open={open}
      title={title}
    >
      <Divider style={{ margin: '0.5rem 0' }} />
      {!isRequesting && !requestError && (
        <Typography.Paragraph>
          {description} 쿠폰이 발급되었습니다.
          <br />
          적용 대상: {membershipType.slice(5)}
          <br />
          할인: {discount}
          {couponType === 'FIX' ? '원' : '%'}
          <br />
          유효기간: {startAt.join('-')} ~ {endAt.join('-')}
        </Typography.Paragraph>
      )}
    </Modal>
  );
};

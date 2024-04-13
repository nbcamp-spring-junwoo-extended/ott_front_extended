import { Alert, Button, Form, FormInstance, Input, Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react';

import { CreateCardFormProps, createCard } from '../../../core/apis/userApi.ts';
import style from '../Profile.module.css';

interface SubmitButtonProps {
  form: FormInstance;
  setCardCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({ form, setCardCreateModal }) => {
  const [submittable, setSubmittable] = useState(false);
  const [errorVisible, setErrorVisible] = useState(false);

  const values = Form.useWatch([], form);

  useEffect(() => {
    form
      .validateFields({ validateOnly: true })
      .then(() => setSubmittable(true))
      .catch(() => setSubmittable(false));
  }, [form, values]);

  function onSubmit() {
    createCard(form.getFieldsValue())
      .then(() => setCardCreateModal(false))
      .catch(() => setErrorVisible(true));
  }

  return (
    <>
      <Button disabled={!submittable} htmlType="submit" onClick={() => onSubmit()} type="primary">
        등록
      </Button>
      {errorVisible ? (
        <Alert
          banner
          closable
          message="카드 등록에 실패했습니다"
          onClose={() => setErrorVisible(false)}
          style={{ marginTop: '10px', width: 'auto' }}
          type="error"
        />
      ) : undefined}
    </>
  );
};

const CreateCardForm = ({ cardCreateModal, setCardCreateModal }) => {
  const [form] = Form.useForm<CreateCardFormProps>();

  return (
    <Modal
      centered
      footer={null}
      initialValues={{
        cardExpirationMonth: '12',
        cardExpirationYear: '12',
        cardNumber: '1234123412341234',
        cardPassword: '12',
        customerName: '이주누',
      }}
      onCancel={() => setCardCreateModal(false)}
      open={cardCreateModal}
      title="카드 등록"
    >
      <Form autoComplete="off" form={form} layout="vertical" name="username">
        <Form.Item
          label="카드에 적힌 이름"
          name="customerName"
          rules={[{ message: '필수 값입니다.', required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="카드 번호(16자리)"
          name="cardNumber"
          rules={[
            {
              len: 16,
              message: '16자리를 입력해주세요.',
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Form.Item
            className={style.cardExpiration}
            label="카드 만료 년(2자리)"
            name="cardExpirationYear"
            rules={[{ len: 2, message: '2자리를 입력해주세요.', required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className={style.cardExpiration}
            label="카드 만료 월(2자리)"
            name="cardExpirationMonth"
            rules={[{ len: 2, message: '2자리를 입력해주세요.', required: true }]}
            style={{ marginLeft: '10px' }}
          >
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item
          className={style.cardExpiration}
          label="카드 비밀번호 앞 2자리"
          name="cardPassword"
          rules={[
            {
              len: 2,
              message: '2자리를 입력해주세요.',
              required: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Space>
            <SubmitButton form={form} setCardCreateModal={setCardCreateModal}>
              Submit
            </SubmitButton>
          </Space>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateCardForm;

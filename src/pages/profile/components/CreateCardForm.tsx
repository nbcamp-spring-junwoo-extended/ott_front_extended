import { Alert, Button, Form, FormInstance, Input, Modal, Space } from 'antd';
import React, { useEffect, useState } from 'react';
import { createCard, CreateCardFormProps } from '../../../core/apis/userApi.ts';
import style from '../Profile.module.css';

interface SubmitButtonProps {
  form: FormInstance;
  setCardCreateModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  form,
  setCardCreateModal,
}) => {
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
      <Button
        type="primary"
        htmlType="submit"
        disabled={!submittable}
        onClick={() => onSubmit()}
      >
        등록
      </Button>
      {errorVisible ? (
        <Alert
          type="error"
          banner
          message="카드 등록에 실패했습니다"
          style={{ width: 'auto', marginTop: '10px' }}
          closable
          onClose={() => setErrorVisible(false)}
        />
      ) : undefined}
    </>
  );
};

const CreateCardForm = ({ cardCreateModal, setCardCreateModal }) => {
  const [form] = Form.useForm<CreateCardFormProps>();

  return (
    <Modal
      title="카드 등록"
      centered
      open={cardCreateModal}
      onCancel={() => setCardCreateModal(false)}
      footer={null}
      initialValues={{
        customerName: '이주누',
        cardNumber: '1234123412341234',
        cardExpirationYear: '12',
        cardExpirationMonth: '12',
        cardPassword: '12',
      }}
    >
      <Form form={form} name="username" layout="vertical" autoComplete="off">
        <Form.Item
          name="customerName"
          label="카드에 적힌 이름"
          rules={[{ required: true, message: '필수 값입니다.' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="cardNumber"
          label="카드 번호(16자리)"
          rules={[
            {
              required: true,
              len: 16,
              message: '16자리를 입력해주세요.',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Form.Item
            className={style.cardExpiration}
            name="cardExpirationYear"
            label="카드 만료 년(2자리)"
            rules={[
              { required: true, len: 2, message: '2자리를 입력해주세요.' },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            className={style.cardExpiration}
            style={{ marginLeft: '10px' }}
            name="cardExpirationMonth"
            label="카드 만료 월(2자리)"
            rules={[
              { required: true, len: 2, message: '2자리를 입력해주세요.' },
            ]}
          >
            <Input />
          </Form.Item>
        </Form.Item>
        <Form.Item
          className={style.cardExpiration}
          name="cardPassword"
          label="카드 비밀번호 앞 2자리"
          rules={[
            {
              required: true,
              len: 2,
              message: '2자리를 입력해주세요.',
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

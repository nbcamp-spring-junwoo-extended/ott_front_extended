import { Button, DatePicker, Divider, Form, Input, message } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
import React, { useState } from 'react';

import { updateProfile } from '../../../../core/apis/userApi.ts';
import { UserProfile } from '../../../../core/types/user.ts';
import { dateArrayToDayjs } from '../../../../utils/dateUtil.ts';

export type ProfileEditFormType = {
  born: dayjs.Dayjs;
  currentPassword: string;
  email: string;
  newPassword?: string;
  newPasswordConfirm?: string;
};

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 },
};

const tailLayout = {
  wrapperCol: { offset: 8, span: 16 },
};

interface UserProfileEditFormProps {
  userProfile: UserProfile;
}

export const UserProfileEditForm: React.FC<UserProfileEditFormProps> = ({ userProfile }) => {
  const { born, email, membershipType, userId, username } = userProfile;
  const [form] = Form.useForm<ProfileEditFormType>();
  const [isChangePassword, setIsChangePassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onFinish = async (values: ProfileEditFormType) => {
    if (isSubmitting) {
      return;
    }

    const { born: newBorn, currentPassword, email: newEmail, newPassword } = values;
    const isNothingChanged =
      email === newEmail && born.toString() === newBorn.toString() && currentPassword === newPassword;
    if (isNothingChanged) {
      message.error('변경된 내용이 없습니다.');
      return;
    }

    setIsSubmitting(true);
    try {
      const putUserRequestDto = {
        checkedPassword: currentPassword,
        newBorn: newBorn.format('YYYY-MM-DD'),
        newEmail,
        newPassword,
      };
      await updateProfile(userId, putUserRequestDto);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        message.error(e.response?.data?.message || e.message || '알 수 없는 오류가 발생했습니다.');
      }
      console.error(e);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePasswordChangeClick = () => {
    form.setFieldsValue({
      currentPassword: undefined,
      newPassword: undefined,
      newPasswordConfirm: undefined,
    });
    setIsChangePassword((prevState) => !prevState);
  };

  return (
    <Form {...layout} form={form} onFinish={onFinish} style={{ maxWidth: 600 }}>
      <Form.Item label="닉네임">
        <Input defaultValue={username} disabled />
      </Form.Item>
      <Form.Item initialValue={email} label="이메일" name="email">
        <Input type="email" />
      </Form.Item>
      <Form.Item initialValue={dateArrayToDayjs(born)} label="생년월일" name="born">
        <DatePicker />
      </Form.Item>
      <Form.Item label="멤버쉽 등급">
        <Input defaultValue={membershipType} disabled />
      </Form.Item>

      <Form.Item label="비밀번호">
        <Button onClick={handlePasswordChangeClick} style={{ backgroundColor: 'orange' }} type="primary">
          {isChangePassword ? '취소' : '변경'}
        </Button>
      </Form.Item>
      {isChangePassword && (
        <>
          <Divider />
          <Form.Item label="새 비밀번호" name="newPassword" rules={[{ required: true }]}>
            <Input type="password" />
          </Form.Item>
          <Form.Item
            label="새 비밀번호 확인"
            name="newPasswordConfirm"
            rules={[
              { required: true },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('newPassword') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('비밀번호가 일치하지 않습니다.'));
                },
              }),
            ]}
          >
            <Input type="password" />
          </Form.Item>
        </>
      )}

      <Divider />
      <Form.Item label="현재 비밀번호" name="currentPassword" rules={[{ required: true }]}>
        <Input type="password" />
      </Form.Item>
      <Form.Item {...tailLayout}>
        <Button htmlType="submit" loading={isSubmitting} type="primary">
          저장
        </Button>
      </Form.Item>
    </Form>
  );
};

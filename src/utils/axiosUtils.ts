import { message } from 'antd';
import axios from 'axios';

export const notifyIfAxiosError = (e: Error): void => {
  if (e.name === 'CanceledError') return;

  if (axios.isAxiosError(e)) {
    message.error(e.response?.data?.message || e.message || '알 수 없는 오류가 발생했습니다.');
  }

  console.error(e);
};

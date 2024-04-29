import dayjs from 'dayjs';

import { authClient } from '../di/authClient.ts';
import { ApiResponse } from '../types/common.ts';

export type LoginFormValues = {
  password: string;
  username: string;
};

export type SignupFormValues = {
  born: dayjs.Dayjs;
  email: string;
  password: string;
  username: string;
};

export const login = async (request: LoginFormValues): ApiResponse<null> =>
  authClient.post('/api/v1/login', {
    password: request.password,
    username: request.username,
  });

export const signup = async (request: SignupFormValues): ApiResponse<null> => {
  const { born, email, password, username } = request;
  return authClient.post('/api/v1/signup', {
    born: born.format('YYYY-MM-DD'),
    email,
    password,
    username,
  });
};

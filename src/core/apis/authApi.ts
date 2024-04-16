import { authClient } from '../di/authClient.ts';
import { CommonResponse } from '../types/common.ts';

export type LoginForm = {
  password: string;
  username: string;
};

export type SignupForm = {
  born: string;
  email: string;
  password: string;
  username: string;
};

export const login = async (request: LoginForm) =>
  authClient.post<CommonResponse<null>>('/api/v1/login', {
    password: request.password,
    username: request.username,
  });

export const signup = async (request: SignupForm) =>
  authClient.post<CommonResponse<null>>('/api/v1/signup', {
    born: request.born,
    email: request.email,
    password: request.password,
    username: request.username,
  });

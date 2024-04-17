import { authClient } from '../di/authClient.ts';
import { ApiResponse } from '../types/common.ts';

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

export const login = async (request: LoginForm): ApiResponse<null> =>
  authClient.post('/api/v1/login', {
    password: request.password,
    username: request.username,
  });

export const signup = async (request: SignupForm): ApiResponse<null> =>
  authClient.post('/api/v1/signup', {
    born: request.born,
    email: request.email,
    password: request.password,
    username: request.username,
  });

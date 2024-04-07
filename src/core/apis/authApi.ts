import authClient from './client.ts';
import { LoginForm } from '../../pages/auth/Login.tsx';

export const login = async (request: LoginForm) => {
  const response = await authClient.post('/api/v1/login', {
    username: request.username,
    password: request.password,
  });
  return response;
};

export const signup = async (
  username: string,
  password: string,
  email: string,
  born: string,
) => {
  const response = await authClient.post('/api/v1/signup', {
    username,
    password,
    email,
    born,
  });
  return response.data;
};

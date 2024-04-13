import { authClient } from '../di/client.ts';

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

export const login = async (request: LoginForm) => {
  const response = await authClient.post('/api/v1/login', {
    password: request.password,
    username: request.username,
  });
  return response;
};

export const signup = async (request: SignupForm) => {
  const response = await authClient.post('/api/v1/signup', {
    born: request.born,
    email: request.email,
    password: request.password,
    username: request.username,
  });
  return response;
};

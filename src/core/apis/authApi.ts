import authClient from '../di/client.ts';

export type LoginForm = {
  username: string;
  password: string;
};

export type SignupForm = {
  username: string;
  password: string;
  email: string;
  born: string;
};

export const login = async (request: LoginForm) => {
  const response = await authClient.post('/api/v1/login', {
    username: request.username,
    password: request.password,
  });
  return response;
};

export const signup = async (request: SignupForm) => {
  const response = await authClient.post('/api/v1/signup', {
    username: request.username,
    password: request.password,
    email: request.email,
    born: request.born,
  });
  return response;
};

import { authClient } from '../di/authClient.ts';

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

export const login = (request: LoginForm) =>
  authClient.post('/api/v1/login', {
    password: request.password,
    username: request.username,
  });

export const signup = (request: SignupForm) =>
  authClient.post('/api/v1/signup', {
    born: request.born,
    email: request.email,
    password: request.password,
    username: request.username,
  });

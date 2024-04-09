import axios, { AxiosHeaders } from 'axios';

const authClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: new AxiosHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }),
});

authClient.interceptors.request.use((config) => {
  localStorage.removeItem('access_token');

  return config;
});

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: new AxiosHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }),
});

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default authClient;

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const accessToken = error?.response?.headers?.authorization.slice(7);

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
    }

    return error;
  },
);

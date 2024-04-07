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

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: true,
  headers: new AxiosHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }),
});

authClient.interceptors.response.use((config) => {
  if (typeof config.headers.authorization !== 'undefined') {
    return config;
  }

  const accessToken = config.headers.authorization.slice(7);
  localStorage.setItem('access_token', accessToken);

  return config;
});

apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('access_token');

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

export default authClient;

import axios, { AxiosHeaders, AxiosInstance } from 'axios';

const authClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: new AxiosHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
});

authClient.interceptors.request.use((config) => {
  localStorage.removeItem('access_token');
  return config;
});

export { authClient };

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

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: new AxiosHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
});

apiClient.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.log('REQUEST', config.url);
  }

  const accessToken: string = localStorage.getItem('access_token');

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(undefined, (error) => {
  const accessToken = error?.response?.headers?.authorization?.slice(7);

  if (accessToken) {
    localStorage.setItem('access_token', accessToken);

    error.config.headers.Authorization = `Bearer ${accessToken}`;
    return apiClient.request(error.config);
  }

  return error;
});

export { apiClient, authClient };

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

apiClient.interceptors.request.use((config) => {
  // todo: access_token 갱신 가능성 검증
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

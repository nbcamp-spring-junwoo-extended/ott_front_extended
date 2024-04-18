import axios, { AxiosHeaders, AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: new AxiosHeaders({
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  }),
  withCredentials: true,
});
apiClient.interceptors.request.use((config) => {
  if (import.meta.env.DEV) console.log('REQUEST', config.url);

  const accessToken: string = localStorage.getItem('access_token') ?? '';

  if (accessToken && config.headers) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const accessToken = error?.response?.headers?.authorization?.slice(7);

    if (accessToken) {
      localStorage.setItem('access_token', accessToken);
      error.config.headers.Authorization = `Bearer ${accessToken}`;

      const retry = async () => {
        try {
          return await apiClient.request(error.config);
        } catch (e) {
          console.error(e);
          localStorage.removeItem('access_token');

          return e;
        }
      };

      return retry().then((r) => r);
    }

    return error;
  },
);

export { apiClient };

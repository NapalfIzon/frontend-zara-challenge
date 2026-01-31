import axios from 'axios';

export const httpClient = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const httpGet = async <T>(endpoint: string): Promise<T> => {
  const response = await httpClient.get<T>(endpoint);
  return response.data;
};

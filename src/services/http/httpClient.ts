import axios from 'axios';

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY || '';

const httpClient = axios.create({
  baseURL: API_URL,
  headers: {
    'x-api-key': API_KEY,
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

export const httpGet = async <T>(endpoint: string): Promise<T> => {
  const response = await httpClient.get<T>(endpoint);
  return response.data;
}

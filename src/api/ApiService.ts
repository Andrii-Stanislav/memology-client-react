import axios from 'axios';
import { setupInterceptorsTo } from './Interceptors';

export const api = setupInterceptorsTo(
  axios.create({
    baseURL: 'http://localhost:5001', // process.env.BASE_API_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }),
);

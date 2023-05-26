import axios from 'axios';

import { setupInterceptorsTo } from './Interceptors';

export const api = setupInterceptorsTo(
  axios.create({
    baseURL: process.env.REACT_API_BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }),
);

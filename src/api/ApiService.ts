import axios from 'axios';

import { setupInterceptorsTo } from './Interceptors';

export const api = setupInterceptorsTo(
  axios.create({
    baseURL:
      process.env.NODE_ENV === 'production'
        ? process.env.REACT_APP_BASE_URL
        : process.env.REACT_APP_LOCAL_BASE_URL,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  }),
);

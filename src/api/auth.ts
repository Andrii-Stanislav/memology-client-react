import { LoginData } from 'types/auth';

import { api } from './ApiService';

export const loginReq = (body: LoginData) => api.post('/auth/login', body);

export const registerReq = (body: LoginData) =>
  api.post('/auth/registration', body);

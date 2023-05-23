import { api } from './ApiService';
import { LoginData } from '../types/auth';

export const loginReq = (body: LoginData) => api.post('/auth/login', body);

export const registerReq = (body: LoginData) =>
  api.post('/auth/registration', body);

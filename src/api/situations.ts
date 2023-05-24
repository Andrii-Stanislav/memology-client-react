import { api } from './ApiService';

export const getAllSituations = () => api.get('/situations');

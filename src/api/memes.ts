import { api } from './ApiService';

export const getAllMemes = () => api.get('/memes');

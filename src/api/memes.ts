import type { SuggestMemeFormType } from 'types/meme';

import { api } from './ApiService';

export const getAllMemes = () => api.get('/memes');

// TODO
export const suggestMeme = (data: SuggestMemeFormType) =>
  new Promise(res => setTimeout(() => res(''), 1000));

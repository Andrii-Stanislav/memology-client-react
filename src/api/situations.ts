import { SuggestSituationFormType } from 'types/situation';

import { api } from './ApiService';

export const getAllSituations = () => api.get('/situations');

export const suggestSituation = (data: SuggestSituationFormType) =>
  new Promise(res => setTimeout(() => res(''), 1000));

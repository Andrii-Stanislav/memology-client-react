import type { Bet, CreateBet } from 'types/game';

import { api } from './ApiService';

export const createBet = (body: CreateBet) => api.post<Bet>('/bets', body);

import { PLAYER_STATUS, CreateBet, Bet } from 'types/game';

import { api } from './ApiService';

export const setPlayerReadyForGame = (playerId: number) =>
  api.patch(`/players/${playerId}`, { status: PLAYER_STATUS.READY });

export const leavePlayerFromGame = (playerId: number) =>
  api.delete(`/players/${playerId}`);

export const makeBet = (playerId: number, body: CreateBet) =>
  api.patch<Bet>(`/players/${playerId}/bet`, body);

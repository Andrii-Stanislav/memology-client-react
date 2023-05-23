import { api } from './ApiService';
import { PLAYER_STATUS } from '../types/game';

export const setPlayerReadyForGame = (playerId: number) =>
  api.patch(`/players/${playerId}`, { status: PLAYER_STATUS.READY });

export const leavePlayerFromGame = (playerId: number) =>
  api.delete(`/players/${playerId}`);

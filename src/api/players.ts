import api from './ApiService';
import { Player, PLAYER_STATUS } from '../types/game';

export const getGamePlayers = (gameId: string) =>
  api.get<Player[]>(`/players?gameId=${gameId}`);

export const setPlayerReadyForGame = (playerId: number) =>
  api.patch(`/players/${playerId}`, { status: PLAYER_STATUS.READY });

export const leavePlayerFromGame = (playerId: number) =>
  api.delete(`/players/${playerId}`);

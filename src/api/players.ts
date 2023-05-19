import api from './ApiService';
import type { Player } from '../types/game';

export const getGamePlayers = (gameId: string) =>
  api.get<Player[]>(`/players?gameId=${gameId}`);

export const removeGamePlayer = (playerId: number) =>
  api.delete(`/players/${playerId}`);

export const leavePlayerFromGame = (playerId: number) =>
  api.delete(`/players/${playerId}`);

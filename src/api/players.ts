import api from './ApiService';
import type { Player } from '../types/game';

export const getGamePlayers = (gameId: string) =>
  api.get<Player[]>(`/players?gameId=${gameId}`);

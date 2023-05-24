import type { Game, Player, CreateGameData, JoinGameData } from 'types/game';

import { api } from './ApiService';

export const getAllGames = () => api.get<Game[]>('/games');

export const getGameById = (gameId: string) =>
  api.get<Game>(`/games/${gameId}`);

export const createGame = (body: CreateGameData) =>
  api.post<Game>('/games', body);

export const joinGame = (body: JoinGameData) =>
  api.post<Player>('/games/join', body);

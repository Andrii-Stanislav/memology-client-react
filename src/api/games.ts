import type {
  Game,
  Player,
  CreateGameData,
  JoinGameData,
  CreateDealType,
} from 'types/game';

import { api } from './ApiService';

export const getAllCreatedGames = () => api.get<Game[]>('/games/created');

export const getAllParticipatedGames = () =>
  api.get<Game[]>('/games/participated');

export const getGameById = (gameId: string) =>
  api.get<Game>(`/games/${gameId}`);

export const createGame = (body: CreateGameData) =>
  api.post<Game>('/games', body);

export const joinGame = (body: JoinGameData) =>
  api.post<Player>('/games/join', body);

export const createNewDeal = (gameId: number, body: CreateDealType) =>
  api.patch<Player>(`/games/${gameId}/deal`, body);

import { User } from './user';

export enum GAME_STATUS {
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export enum DEAL_STATUS {
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export type Game = {
  id: number;
  title: string;
  cards: string;
  cardsOnHands: number;
  createdAt: string;
  creator: User;
  creatorId: number;
  joinCode: string;
  players: User[];
  playersCount: number;
  status: GAME_STATUS;
  currentDealId: number | null;
  // TODO - describe
  deals: [];
};

export type Player = {
  id: number;
  name: string;
  cards: string;
  userId: number;
  gameId: number;
};

export type CreateGameData = {
  title: string;
  playersCount: number;
  totalCardsPerUser: number;
  cardsOnHands: number;
};

export type JoinGameData = {
  gameId: number;
  joinCode: string;
  playerName: string;
};

import { User } from './user';

export enum GAME_STATUS {
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export enum DEAL_STATUS {
  NOT_STARTED = 'NOT_STARTED',
  STARTED = 'STARTED',
  FINISHED = 'FINISHED',
}

export enum PLAYER_STATUS {
  WAITING = 'WAITING',
  READY = 'READY',
}

export type Player = {
  id: number;
  name: string;
  status: PLAYER_STATUS;
  cards: number[];
  userId: number;
  gameId: number;
  createdAt: string;
};

export type Bet = {
  id: number;
  userId: number;
  cardId: number;
  dealId: number;
};

export type Deal = {
  id: number;
  status: DEAL_STATUS;
  situationId: number;
  gameId: number;
  winnerId: number | null;
  judgeId: number;
  bets: Bet[];
};

export type Game = {
  id: number;
  title: string;
  status: GAME_STATUS;
  joinCode: string;
  currentDealId: number | null;
  creatorId: number;
  playersCount: number;
  cardsOnHands: number;
  cards: number[];
  situations: number[];
  createdAt: string;
  creator: User;
  deals: Deal[];
  players: Player[];
};

// * Form Data

export type CreateGameData = {
  title: string;
  playersCount: number;
  dealsCount: number;
  cardsOnHands: number;
};

export type JoinGameData = {
  gameId: number;
  joinCode: string;
  playerName: string;
};

export type CreateBet = {
  dealId: number;
  cardId: number;
};

export type CreateDealType = {
  judgeId: number;
};

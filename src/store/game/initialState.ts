import { Game, GAME_STATUS } from 'types/game';

export const initialState = {
  id: 0,
  title: '',
  status: GAME_STATUS.NOT_STARTED,
  joinCode: '',
  currentDealId: null,
  creatorId: 0,
  playersCount: 0,
  cardsOnHands: 0,
  cards: [],
  situations: [],
  createdAt: '',
  creator: {
    id: 0,
    name: '',
    email: '',
  },
  deals: [],
  players: [],
} as Game;

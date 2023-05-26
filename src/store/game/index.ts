import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Game, Bet, PLAYER_STATUS, DEAL_STATUS } from 'types/game';

import { initialState } from './initialState';

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<Game>) => action.payload,
    clearCurrentGame: state => {
      state = initialState;
    },
    removePlayerFromGame: (state, { payload }: PayloadAction<number>) => {
      state.players = state.players.filter(({ userId }) => userId !== payload);
    },
    setPlayerReady: (state, { payload }: PayloadAction<number>) => {
      state.players = state.players.map(player =>
        player.userId === payload
          ? { ...player, status: PLAYER_STATUS.READY }
          : player,
      );
    },
    setCurrentDealStarted: state => {
      state.deals = state.deals.map(deal =>
        deal.id === state.currentDealId
          ? { ...deal, status: DEAL_STATUS.STARTED }
          : deal,
      );
    },
    addNewBet: (state, { payload }: PayloadAction<Bet>) => {
      state.deals = state.deals.map(deal =>
        deal.id === state.currentDealId
          ? {
              ...deal,
              bets: [
                ...(deal?.bets?.filter(({ id }) => id !== payload.id) ?? []),
                payload,
              ],
            }
          : deal,
      );
    },
  },
});

export const {
  setCurrentGame,
  clearCurrentGame,
  removePlayerFromGame,
  setPlayerReady,
  setCurrentDealStarted,
  addNewBet,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;

export * from './selectors';

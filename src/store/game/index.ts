import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Game, PLAYER_STATUS, DEAL_STATUS } from 'types/game';

import { initialState } from './initialState';

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<Game>) => action.payload,
    cleaCurrentGame: state => {
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
  },
});

export const {
  setCurrentGame,
  cleaCurrentGame,
  removePlayerFromGame,
  setPlayerReady,
  setCurrentDealStarted,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;

export * from './selectors';

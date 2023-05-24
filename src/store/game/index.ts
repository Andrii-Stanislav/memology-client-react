import { createSlice, PayloadAction, createSelector } from '@reduxjs/toolkit';

import { Game, PLAYER_STATUS, DEAL_STATUS } from 'types/game';

import type { StoreType } from '../store';
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
  },
});

export const {
  setCurrentGame,
  cleaCurrentGame,
  removePlayerFromGame,
  setPlayerReady,
} = gameSlice.actions;

export const gameReducer = gameSlice.reducer;

// * selectors

export const hasNoGame = (store: StoreType) => store.game.id === 0;
export const getCurrentGame = (store: StoreType) => store.game;

export const getCurrentDeal = (store: StoreType) =>
  store.game.deals.find(({ id }) => id === store.game.currentDealId) ?? null;

export const getCanSelectCard = createSelector(
  getCurrentDeal,
  deal => deal?.status === DEAL_STATUS.STARTED,
);

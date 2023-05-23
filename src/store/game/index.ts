import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Game, PLAYER_STATUS } from '../../types/game';
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
    setPlayerReady: (state, action: PayloadAction<number>) => {
      state.players = state.players.map(player =>
        player.userId === action.payload
          ? { ...player, status: PLAYER_STATUS.READY }
          : player,
      );
    },
  },
});

export const { setCurrentGame, cleaCurrentGame, setPlayerReady } =
  gameSlice.actions;

export const gameReducer = gameSlice.reducer;

export const hasNoGame = (store: StoreType) => store.game.id === 0;
export const getCurrentGame = (store: StoreType) => store.game;

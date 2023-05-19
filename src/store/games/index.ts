import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Game, Player } from '../../types/game';
import type { StoreType } from '../store';

const initialState = {
  currentGame: null as Game | null,
  currentGamePlayers: [] as Player[],
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<Game | null>) => {
      state.currentGame = action.payload;
    },
    setCurrentGamePlayers: (state, action: PayloadAction<Player[]>) => {
      state.currentGamePlayers = action.payload;
    },
    clearPlayers: state => {
      state.currentGamePlayers = [];
    },
  },
});

export const { setCurrentGame, setCurrentGamePlayers, clearPlayers } =
  gamesSlice.actions;

export default gamesSlice.reducer;

export const getCurrentGame = (store: StoreType) => store.games.currentGame;
export const getCurrentGamePlayers = (store: StoreType) =>
  store.games.currentGamePlayers;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Game } from '../../types/game';
import type { StoreType } from '../store';

const initialState = {
  currentGame: null as Game | null,
};

export const gamesSlice = createSlice({
  name: 'games',
  initialState,
  reducers: {
    setCurrentGame: (state, action: PayloadAction<Game | null>) => {
      state.currentGame = action.payload;
    },
  },
});

export const { setCurrentGame } = gamesSlice.actions;

export default gamesSlice.reducer;

export const getCurrentGame = (store: StoreType) => store.games.currentGame;

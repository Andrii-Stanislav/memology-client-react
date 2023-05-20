import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Game, Player, PLAYER_STATUS } from '../../types/game';
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
    setPlayerReady: (state, action: PayloadAction<number>) => {
      state.currentGamePlayers = state.currentGamePlayers.map(player =>
        player.userId === action.payload
          ? { ...player, status: PLAYER_STATUS.READY }
          : player,
      );
    },
  },
});

export const {
  setCurrentGame,
  setCurrentGamePlayers,
  clearPlayers,
  setPlayerReady,
} = gamesSlice.actions;

export default gamesSlice.reducer;

export const getCurrentGame = (store: StoreType) => store.games.currentGame;
export const getCurrentGamePlayers = (store: StoreType) =>
  store.games.currentGamePlayers;

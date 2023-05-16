import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { Game, Player } from '../../types/game';
import type { StoreType } from '../store';

const initialState = {
  currentGame: null as Game | null,
  currentGamePlayers: [] as Player[],
  currentGameOnlinePlayers: [] as number[],
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
    onJoinPlayer: (state, action: PayloadAction<number>) => {
      state.currentGameOnlinePlayers = [
        ...state.currentGameOnlinePlayers,
        action.payload,
      ];
    },
    onLeavePlayer: (state, action: PayloadAction<number>) => {
      state.currentGameOnlinePlayers = state.currentGameOnlinePlayers.filter(
        userId => userId !== action.payload,
      );
    },
  },
});

export const {
  setCurrentGame,
  setCurrentGamePlayers,
  onJoinPlayer,
  onLeavePlayer,
} = gamesSlice.actions;

export default gamesSlice.reducer;

export const getCurrentGame = (store: StoreType) => store.games.currentGame;
export const getCurrentGamePlayers = (store: StoreType) =>
  store.games.currentGamePlayers;
export const getOnlinePlayers = (store: StoreType) =>
  store.games.currentGameOnlinePlayers;

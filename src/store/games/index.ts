import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Game, PLAYER_STATUS } from '../../types/game';
import type { StoreType } from '../store';

// TODO - create init empty game

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
    setPlayerReady: (state, action: PayloadAction<number>) => {
      return {
        ...state,
        currentGame: state.currentGame
          ? {
              ...state.currentGame,
              players: state.currentGame?.players.map(player =>
                player.userId === action.payload
                  ? { ...player, status: PLAYER_STATUS.READY }
                  : player,
              ),
            }
          : null,
      };
    },
  },
});

export const { setCurrentGame, setPlayerReady } = gamesSlice.actions;

export default gamesSlice.reducer;

export const getCurrentGame = (store: StoreType) => store.games.currentGame;

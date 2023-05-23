import { createSlice } from '@reduxjs/toolkit';

import type { Meme } from '../../types/meme';
import type { StoreType } from '../store';

type MemesState = {
  isLoaded: boolean;
  allMemesList: Meme[];
};

const initialState: MemesState = {
  isLoaded: false,
  allMemesList: [],
};

export const memesSlice = createSlice({
  name: 'memes',
  initialState,
  reducers: {
    setAllMemes: (state, action) => {
      state.isLoaded = true;
      state.allMemesList = action.payload;
    },
  },
});

export const { setAllMemes } = memesSlice.actions;

export const memesReducer = memesSlice.reducer;

export const allMemesIsLoaded = (store: StoreType) => store.memes.isLoaded;
export const getAllMemes = (store: StoreType) => store.memes.allMemesList;

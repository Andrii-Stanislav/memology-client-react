import { createSlice } from '@reduxjs/toolkit';

import type { Situation } from 'types/situation';

import type { StoreType } from '../store';

type StateType = {
  isLoaded: boolean;
  allSituationsList: Situation[];
};

const initialState: StateType = {
  isLoaded: false,
  allSituationsList: [],
};

export const situationsSlice = createSlice({
  name: 'situations',
  initialState,
  reducers: {
    setAllSituations: (state, action) => {
      state.isLoaded = true;
      state.allSituationsList = action.payload;
    },
  },
});

export const { setAllSituations } = situationsSlice.actions;

export const situationsReducer = situationsSlice.reducer;

export const allSituationsIsLoaded = (store: StoreType) =>
  store.situations.isLoaded;

export const getAllSituations = (store: StoreType) =>
  store.situations.allSituationsList;

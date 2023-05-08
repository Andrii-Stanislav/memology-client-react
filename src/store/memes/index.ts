import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import { getAllMemes } from "../../api/memes";
import type { Meme } from "../../types/meme";
import type { StoreType } from "../store";

export const fetchAllMemes = createAsyncThunk(
  "memes/fetchAllMemes",
  async () => {
    const { data } = await getAllMemes();
    return data;
  }
);

interface CounterState {
  isLoaded: boolean;
  allMemesList: Meme[];
}

const initialState: CounterState = {
  isLoaded: false,
  allMemesList: [],
};

export const memesSlice = createSlice({
  name: "memes",
  initialState,
  reducers: {
    //
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllMemes.fulfilled, (state, action) => {
      state.isLoaded = true;
      state.allMemesList = action.payload;
    });
  },
});

export default memesSlice.reducer;

export const allMemesIsLoaded = (store: StoreType) => store.memes.isLoaded;
export const allMemes = (store: StoreType) => store.memes.allMemesList;

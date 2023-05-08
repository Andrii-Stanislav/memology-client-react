import { createSlice } from "@reduxjs/toolkit";

import type { User } from "../../types/user";
import type { StoreType } from "../store";

const initialState = null as User | null;

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (_, action) => action.payload,
    userLoggedOut: () => initialState,
  },
});

export const { setUser, userLoggedOut } = userSlice.actions;

export default userSlice.reducer;

export const getUser = (store: StoreType) => store.user;

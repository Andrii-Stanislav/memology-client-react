import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import user from "./user";
import memes from "./memes";

const persistConfig = {
  key: "memology:store",
  keyPrefix: "",
  storage,
  whitelist: ["user", "memes"],
};

const rootReducers = combineReducers({ user, memes });
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
});

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector;

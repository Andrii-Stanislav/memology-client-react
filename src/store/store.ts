import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux';
import { persistReducer } from 'redux-persist';
import { persistConfig, PERSIST_MIDDLEWARE_OPTIONS } from './persistConfig';

import user from './user';
import memes from './memes';
import games from './games';

const rootReducers = combineReducers({ user, memes, games });
const persistedReducer = persistReducer(persistConfig, rootReducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getMiddleware => getMiddleware(PERSIST_MIDDLEWARE_OPTIONS),
});

export type StoreType = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<StoreType> = useSelector;

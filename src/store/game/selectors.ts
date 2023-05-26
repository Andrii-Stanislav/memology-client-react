import { createSelector } from '@reduxjs/toolkit';

import { DEAL_STATUS } from 'types/game';

import type { StoreType } from '../store';

export const hasNoGame = (store: StoreType) => store.game.id === 0;
export const getCurrentGame = (store: StoreType) => store.game;

export const getCurrentDeal = (store: StoreType) =>
  store.game.deals?.find(({ id }) => id === store.game.currentDealId) ?? null;

export const getCanSelectCard = createSelector(
  getCurrentDeal,
  deal => deal?.status === DEAL_STATUS.STARTED,
);

export const getCurrentDealWinner = createSelector(
  [getCurrentGame, getCurrentDeal],
  (game, deal) => game.players.find(player => player.userId === deal?.winnerId),
);

export const getIsAllUsersMadeBet = createSelector(
  [getCurrentGame, getCurrentDeal],
  (game, deal) => game.players.length - 1 === deal?.bets.length,
);

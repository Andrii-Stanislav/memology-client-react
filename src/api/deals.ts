import { DEAL_STATUS } from 'types/game';

import { api } from './ApiService';

export const startDeal = (dealId: number) =>
  api.patch(`/deals/${dealId}`, { status: DEAL_STATUS.STARTED });

export const setDealVinner = (dealId: number, vinnerId: number) =>
  api.patch(`/deals/${dealId}`, { status: DEAL_STATUS.FINISHED, vinnerId });

import { GAME_STATUS } from 'types/game';

import { useAppSelector } from 'store';
import { getUser } from 'store/user';
import { getCurrentGame, getCurrentDeal } from 'store/game';

export const useSecondRunningLineText = () => {
  const user = useAppSelector(getUser);
  const game = useAppSelector(getCurrentGame);
  const currentDeal = useAppSelector(getCurrentDeal);

  if (game.players.every(player => player.userId !== user?.id)) {
    return "Let's join";
  }

  if (game.status === GAME_STATUS.NOT_STARTED) {
    return 'Whaiting for all users';
  }

  if (game.status === GAME_STATUS.STARTED) {
    return `Deal #${game.deals.length}. Status: ${currentDeal?.status}`;
  }

  // TODO
  return 'qweqwe';
};

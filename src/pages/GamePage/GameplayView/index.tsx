import { useMemo } from 'react';

import { Box, Button, Backdrop } from '@mui/material';

import { setPlayerReadyForGame } from 'api/players';
import { startDeal } from 'api/deals';
import { PLAYER_STATUS } from 'types/game';
import { Meme } from 'types/meme';
import { gameSocket, GAME_WS_KEYS } from 'webSocket';

import { useAppDispatch, useAppSelector } from 'store';
import { getUser } from 'store/user';
import {
  setPlayerReady,
  getCurrentGame,
  hasNoGame,
  getCurrentDeal,
  setCurrentDealStarted,
} from 'store/game';
import { getAllMemes } from 'store/memes';

import { LeaveGame } from './LeaveGame';
import { CurrentUser, PlayerName } from './PlayerElements';
import { CardsDialog } from './CardsDialog';
import { GameTable } from './GameTable';
import { SituationControl } from './SituationControl';

type Props = {
  updateGame: () => void;
};

export const GameplayView = ({ updateGame }: Props) => {
  const dispatch = useAppDispatch();

  const allMemes = useAppSelector(getAllMemes);
  const user = useAppSelector(getUser);
  const game = useAppSelector(getCurrentGame);
  const noGame = useAppSelector(hasNoGame);
  const currentDeal = useAppSelector(getCurrentDeal);

  const mainPlayer = useMemo(
    () => game.players.find(({ userId }) => userId === user?.id)!,
    [user, game],
  );

  const players = useMemo(
    () => game.players.filter(({ userId }) => userId !== user?.id),
    [game, user?.id],
  );

  if (noGame || !mainPlayer) {
    return null;
  }

  const cards = allMemes.filter(meme => mainPlayer.cards.includes(meme.id));

  const onReadyClick = () => {
    setPlayerReadyForGame(mainPlayer.id).then(() => {
      dispatch(setPlayerReady(user?.id!));
      gameSocket.emit(GAME_WS_KEYS.READY_FOR_GAME, {
        gameId: game.id,
        userId: user?.id,
      });
    });
  };

  const showSituation = () => {
    startDeal(currentDeal?.id!).then(() => {
      dispatch(setCurrentDealStarted());
      gameSocket.emit(GAME_WS_KEYS.DEAL_STARTED, {
        gameId: currentDeal?.gameId,
        dealId: currentDeal?.id,
      });
    });
  };

  const onChooseCard = (card: Meme) => {
    // TODO
  };

  return (
    <Box height="100%" p={2} position="relative">
      <GameTable
        players={players}
        playersCount={game.playersCount}
        currentDeal={currentDeal}
      />

      <CurrentUser
        isReady={mainPlayer?.status === PLAYER_STATUS.READY}
        isJudge={mainPlayer.userId === currentDeal?.judgeId}
      >
        <CardsDialog cards={cards} onChooseCard={onChooseCard}>
          <PlayerName>{mainPlayer?.name}</PlayerName>
        </CardsDialog>
      </CurrentUser>

      <LeaveGame
        mainPlayerId={mainPlayer.id}
        gameId={game.id}
        userId={user?.id!}
      />

      <SituationControl
        currentDeal={currentDeal}
        isJudge={mainPlayer.userId === currentDeal?.judgeId}
        showSituation={showSituation}
      />

      {mainPlayer?.status === PLAYER_STATUS.WAITING && (
        <Backdrop open>
          <Button variant="contained" onClick={onReadyClick}>
            I am ready
          </Button>
        </Backdrop>
      )}
    </Box>
  );
};

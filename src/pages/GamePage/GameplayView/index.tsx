import { useMemo } from 'react';

import { Box, Button, Backdrop } from '@mui/material';

import { createNewDeal } from 'api/games';
import { setPlayerReadyForGame, makeBet } from 'api/players';
import { startDeal, setDealVinner } from 'api/deals';
import { GAME_STATUS, PLAYER_STATUS } from 'types/game';
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
  addNewBet,
} from 'store/game';
import { getAllMemes } from 'store/memes';

import { LeaveGame } from './LeaveGame';
import { CurrentUser, PlayerName } from './PlayerElements';
import { CardsDialog } from './CardsDialog';
import { GameTable } from './GameTable';
import { SituationControl } from './SituationControl';
import { BetsControl } from './BetsControl';
import { FinishedGame } from './FinishedGame';

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

  const gameFinished = game.status === GAME_STATUS.FINISHED;

  const mainPlayer = useMemo(
    () => game.players.find(({ userId }) => userId === user?.id)!,
    [user, game],
  );

  const isJudge = useMemo(
    () => mainPlayer?.userId === currentDeal?.judgeId,
    [currentDeal?.judgeId, mainPlayer?.userId],
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
        gameId: game.id,
        dealId: currentDeal?.id,
      });
    });
  };

  const onChooseCard = (card: Meme) => {
    makeBet(mainPlayer.id, { dealId: currentDeal?.id!, cardId: card.id }).then(
      ({ data }) => {
        dispatch(addNewBet(data));
        gameSocket.emit(GAME_WS_KEYS.CREATE_BET, {
          gameId: game.id,
          newBet: data,
        });
        return data;
      },
    );
  };

  const onSelectViner = (dealId: number, userId: number) => {
    setDealVinner(dealId, userId).then(() => {
      gameSocket.emit(GAME_WS_KEYS.DEAL_FINISHED, {
        gameId: game.id,
        dealId,
      });
      updateGame();
    });
  };

  const goToNextDeal = (vinerId: number) => {
    createNewDeal(game.id, { judgeId: vinerId }).then(() => {
      gameSocket.emit(GAME_WS_KEYS.CREATE_NEW_DEAL, { gameId: game.id });
      updateGame();
    });
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
        isJudge={isJudge}
      >
        <CardsDialog
          isJudge={isJudge}
          cards={cards}
          onChooseCard={onChooseCard}
        >
          <PlayerName>{mainPlayer?.name}</PlayerName>
        </CardsDialog>
      </CurrentUser>

      {!gameFinished && (
        <LeaveGame
          mainPlayerId={mainPlayer.id}
          gameId={game.id}
          userId={user?.id!}
        />
      )}

      {!gameFinished && (
        <SituationControl
          currentDeal={currentDeal}
          isJudge={isJudge}
          showSituation={showSituation}
        />
      )}

      {!gameFinished && (
        <BetsControl
          isJudge={isJudge}
          currentDeal={currentDeal}
          onSelectViner={onSelectViner}
          goToNextDeal={goToNextDeal}
        />
      )}

      {gameFinished && <FinishedGame />}

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

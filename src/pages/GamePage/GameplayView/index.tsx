import { useMemo } from 'react';

import { Box, Button, Backdrop } from '@mui/material';

import { setPlayerReadyForGame } from '../../../api/players';
import { PLAYER_STATUS } from '../../../types/game';
import { Meme } from '../../../types/meme';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getUser } from '../../../store/user';
import { setPlayerReady, getCurrentGame, hasNoGame } from '../../../store/game';
import { getAllMemes } from '../../../store/memes';
import { gameSocket, GAME_WS_KEYS } from '../../../ws';

import { LeaveGame } from './LeaveGame';
import { CurrentUser, PlayerName } from './PlayerElements';
import { CardsDialog } from './CardsDialog';
import { GameTable } from './GameTable';

type Props = {
  updateGame: () => void;
};

export const GameplayView = ({ updateGame }: Props) => {
  const dispatch = useAppDispatch();

  const allMemes = useAppSelector(getAllMemes);
  const user = useAppSelector(getUser);
  const game = useAppSelector(getCurrentGame);
  const noGame = useAppSelector(hasNoGame);

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

  const onChooseCard = (card: Meme) => {
    // TODO
  };

  return (
    <Box height="100%" p={2} position="relative">
      <GameTable players={players} playersCount={game.playersCount} />

      <CurrentUser isReady={mainPlayer?.status === PLAYER_STATUS.READY}>
        <CardsDialog cards={cards} onChooseCard={onChooseCard}>
          <PlayerName>{mainPlayer?.name}</PlayerName>
        </CardsDialog>
      </CurrentUser>

      <LeaveGame
        mainPlayerId={mainPlayer.id}
        gameId={game.id}
        userId={user?.id!}
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

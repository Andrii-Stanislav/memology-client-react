import { useEffect, useMemo } from 'react';

import { Box, Button } from '@mui/material';
import { toast } from 'react-toastify';

import { leavePlayerFromGame } from '../../../api/players';
import type { Game } from '../../../types/game';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getUser } from '../../../store/user';
import { clearPlayers, getCurrentGamePlayers } from '../../../store/games';
import { gameSocket, GAME_WS_KEYS } from '../../../ws';

import GameTable4Users from './GameTable4Users';
import GameTable5Users from './GameTable5Users';
import GameTable6Users from './GameTable6Users';

type Props = {
  game: Game;
};

const GameplayView = ({ game }: Props) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(getUser);
  const gamePlayers = useAppSelector(getCurrentGamePlayers);

  // const onTestMessage = () => {
  // toast('Test msg');
  // gameSocket.emit(GAME_WS_KEYS.TEST_MESSAGE, {
  //   gameId: game?.id,
  //   qweqwe: 'qweqwewe',
  //   someArray: [1, 2, 3],
  //   num: 4356,
  // });
  // };

  const mainPlayer = useMemo(
    () => ({
      userId: user?.id!,
      name: gamePlayers.find(({ userId }) => userId === user?.id)?.name ?? '',
      isOnline: true,
    }),
    [user, gamePlayers],
  );

  const players = useMemo(
    () =>
      gamePlayers
        .filter(({ userId }) => userId !== user?.id)
        .map(player => ({
          userId: player?.userId!,
          name: player?.name!,
          isOnline: true,
        })),
    [gamePlayers, user?.id],
  );

  useEffect(() => {
    gameSocket.emit(GAME_WS_KEYS.JOIN_GAME, {
      gameId: game.id,
      userId: user?.id,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const gameTable =
    game?.playersCount === 4 ? (
      <GameTable4Users players={players} mainPlayer={mainPlayer} />
    ) : game?.playersCount === 5 ? (
      <GameTable5Users players={players} mainPlayer={mainPlayer} />
    ) : game?.playersCount === 6 ? (
      <GameTable6Users players={players} mainPlayer={mainPlayer} />
    ) : null;

  const onLeaveGame = () => {
    const currentPlayer = gamePlayers.find(({ userId }) => userId === user?.id);
    if (!currentPlayer) return;

    leavePlayerFromGame(currentPlayer.id).then(() => {
      dispatch(clearPlayers());
      gameSocket.emit(GAME_WS_KEYS.LEAVE_GAME, {
        gameId: game.id,
        userId: user?.id,
      });
    });
  };

  return (
    <Box height="100%" position="relative">
      {gameTable}
      <Box position="absolute" top="5px" right="5px">
        <Button size="small" onClick={onLeaveGame}>
          Leave game
        </Button>
      </Box>
    </Box>
  );
};

export default GameplayView;

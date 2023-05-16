import { useEffect, useMemo } from 'react';

import { Box } from '@mui/material';
import { toast } from 'react-toastify';

import type { Game } from '../../../types/game';
import { useAppSelector } from '../../../store';
import { getUser } from '../../../store/user';
import { getCurrentGamePlayers, getOnlinePlayers } from '../../../store/games';
import { gameSocket, GAME_WS_KEYS } from '../../../ws';

import GameTable4Users from './GameTable4Users';
import GameTable5Users from './GameTable5Users';
import GameTable6Users from './GameTable6Users';

type Props = {
  game: Game;
};

const GameplayView = ({ game }: Props) => {
  const user = useAppSelector(getUser);
  const gamePlayers = useAppSelector(getCurrentGamePlayers);
  const onlinePlayers = useAppSelector(getOnlinePlayers);
  console.log('onlinePlayers: ', onlinePlayers);

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

    return () => {
      gameSocket.emit(GAME_WS_KEYS.LEAVE_GAME, {
        gameId: game.id,
        userId: user?.id,
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onLeaveGame = () => {
      gameSocket.emit(GAME_WS_KEYS.LEAVE_GAME, {
        gameId: game.id,
        userId: user?.id,
      });
    };

    window.addEventListener('pagehide', onLeaveGame);
    return () => {
      window.removeEventListener('pagehide', onLeaveGame);
    };
  }, [game.id, user?.id]);

  const gameTable =
    game?.playersCount === 4 ? (
      <GameTable4Users players={players} mainPlayer={mainPlayer} />
    ) : game?.playersCount === 5 ? (
      <GameTable5Users players={players} mainPlayer={mainPlayer} />
    ) : game?.playersCount === 6 ? (
      <GameTable6Users players={players} mainPlayer={mainPlayer} />
    ) : null;

  return <Box height="100%">{gameTable}</Box>;
};

export default GameplayView;

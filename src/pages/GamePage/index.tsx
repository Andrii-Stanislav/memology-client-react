import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Backdrop,
  CircularProgress,
  Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';

import { getGameById } from '../../api/games';
import { useAppDispatch, useAppSelector } from '../../store';
import { getUser } from '../../store/user';
import { setCurrentGame } from '../../store/game';
import { gameSocket, GAME_WS_KEYS } from '../../ws';

import { useGameSocket } from './useGameSocket';
import { GameBackground } from './GameBackground';
import { JoinView } from './JoinView';
import { GameplayView } from './GameplayView';

export const GamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const dispatch = useAppDispatch();

  const { data, isFetched, refetch } = useQuery({
    queryKey: ['getGameById', gameId],
    queryFn: ({ queryKey }) => getGameById(queryKey[1]!),
  });

  useEffect(() => {
    data?.data && dispatch(setCurrentGame(data?.data));
  }, [dispatch, data?.data]);

  useGameSocket({ gameId, updateGame: refetch });

  const user = useAppSelector(getUser);
  const game = data?.data;

  const afterJoin = () => {
    gameSocket.emit(GAME_WS_KEYS.READY_FOR_GAME, {
      gameId: gameId,
      userId: user?.id,
    });
    refetch();
  };

  if (!isFetched) {
    return (
      <Backdrop open>
        <CircularProgress color="inherit" />
      </Backdrop>
    );
  }

  if (!game) {
    return (
      <Container component="main">
        <Typography variant="h5" textAlign="center" pt={3}>
          Game not found
        </Typography>
      </Container>
    );
  }

  if (game.players.some(player => player.userId === user?.id)) {
    return (
      <GameBackground gameName={game.title}>
        <GameplayView updateGame={refetch} />;
      </GameBackground>
    );
  }

  return (
    <Container component="main">
      <GameBackground gameName={game.title}>
        <JoinView afterJoin={afterJoin} />
      </GameBackground>
    </Container>
  );
};

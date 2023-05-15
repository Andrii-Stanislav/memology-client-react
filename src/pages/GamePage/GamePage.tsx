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
import { setCurrentGame } from '../../store/games';

import useGameSocket from './useGameSocket';
import JoinView from './JoinView';
import GameplayView from './GameplayView';

const GamePage = () => {
  const dispatch = useAppDispatch();
  const { gameId } = useParams<{ gameId: string }>();
  useGameSocket({ gameId });

  const user = useAppSelector(getUser);

  const { data, isFetched, refetch } = useQuery({
    queryKey: ['getGameById', gameId!],
    queryFn: ({ queryKey }) => getGameById(queryKey[1]),
  });

  const game = data?.data;

  useEffect(() => {
    game && dispatch(setCurrentGame(game));
  }, [dispatch, game]);

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

  if (game?.players.some(player => player.id === user?.id)) {
    return (
      <Container component="main">
        <GameplayView game={game} />
      </Container>
    );
  }

  return (
    <Container component="main">
      <JoinView game={game} refreshGame={refetch} />
    </Container>
  );
};

export default GamePage;

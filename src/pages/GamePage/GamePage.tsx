import { useParams } from 'react-router-dom';
import {
  Container,
  Backdrop,
  CircularProgress,
  Typography,
} from '@mui/material';

import { useAppSelector } from '../../store';
import { getUser } from '../../store/user';

import useGameSocket from './useGameSocket';
import JoinView from './JoinView';
import GameplayView from './GameplayView';
import useGetGame from './useGetGame';
import useGetPlayers from './useGetPlayers';

const GamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();
  useGameSocket({ gameId });

  const user = useAppSelector(getUser);

  const { game, isFetchedGame, refetchGame } = useGetGame(gameId!);
  const { gamePlayers } = useGetPlayers(gameId!);

  if (!isFetchedGame) {
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

  if (gamePlayers.some(player => player.userId === user?.id)) {
    return <GameplayView game={game} />;
  }

  return (
    <Container component="main">
      <JoinView game={game} refreshGame={refetchGame} />
    </Container>
  );
};

export default GamePage;

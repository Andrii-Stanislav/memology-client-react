import { useParams } from 'react-router-dom';
import {
  Container,
  Backdrop,
  CircularProgress,
  Typography,
} from '@mui/material';

import { useAppSelector } from '../../store';
import { getUser } from '../../store/user';
import { getCurrentGame, getCurrentGamePlayers } from '../../store/games';

import useGameSocket from './useGameSocket';
import JoinView from './JoinView';
import GameplayView from './GameplayView';
import useGetGame from './useGetGame';
import useGetPlayers from './useGetPlayers';

const GamePage = () => {
  const { gameId } = useParams<{ gameId: string }>();

  const { isFetchedGame, updateGame } = useGetGame(gameId!);
  const { isFetchedPlayers, updatePlayers } = useGetPlayers(gameId!);

  useGameSocket({ gameId, updateGame, updatePlayers });

  const user = useAppSelector(getUser);
  const game = useAppSelector(getCurrentGame);
  const gamePlayers = useAppSelector(getCurrentGamePlayers);

  const afterJoin = () => {
    updateGame();
    updatePlayers();
  };

  if (!isFetchedGame || !isFetchedPlayers) {
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
      <JoinView game={game} afterJoin={afterJoin} />
    </Container>
  );
};

export default GamePage;

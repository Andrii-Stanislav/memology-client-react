import { useMemo } from 'react';

import { Box, Button, Backdrop } from '@mui/material';

import {
  setPlayerReadyForGame,
  leavePlayerFromGame,
} from '../../../api/players';
import { PLAYER_STATUS, Game } from '../../../types/game';
import { useAppDispatch, useAppSelector } from '../../../store';
import { getUser } from '../../../store/user';
import {
  clearPlayers,
  setPlayerReady,
  getCurrentGamePlayers,
} from '../../../store/games';
import { gameSocket, GAME_WS_KEYS } from '../../../ws';

import GameTable3Users from './GameTable3Users';
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

  const mainPlayer = useMemo(
    () => gamePlayers.find(({ userId }) => userId === user?.id)!,
    [user, gamePlayers],
  );

  const players = useMemo(
    () => gamePlayers.filter(({ userId }) => userId !== user?.id),
    [gamePlayers, user?.id],
  );

  const gameTable =
    game?.playersCount === 3 ? (
      <GameTable3Users players={players} mainPlayer={mainPlayer} />
    ) : game?.playersCount === 4 ? (
      <GameTable4Users players={players} mainPlayer={mainPlayer} />
    ) : game?.playersCount === 5 ? (
      <GameTable5Users players={players} mainPlayer={mainPlayer} />
    ) : game?.playersCount === 6 ? (
      <GameTable6Users players={players} mainPlayer={mainPlayer} />
    ) : null;

  const onLeaveGame = () => {
    leavePlayerFromGame(mainPlayer.id).then(() => {
      dispatch(clearPlayers());
      gameSocket.emit(GAME_WS_KEYS.LEAVE_GAME, {
        gameId: game.id,
        userId: user?.id,
      });
    });
  };

  const onReadyClick = () => {
    setPlayerReadyForGame(mainPlayer.id).then(() => {
      dispatch(setPlayerReady(user?.id!));
      gameSocket.emit(GAME_WS_KEYS.READY_FOR_GAME, {
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

export default GameplayView;

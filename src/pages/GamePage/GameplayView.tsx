import { useEffect } from 'react';

import { Box, Button, Typography } from '@mui/material';

import type { Game } from '../../types/game';
import { gameSocket, GAME_WS_KEYS } from '../../ws';

type Props = {
  game: Game;
};

const GameplayView = ({ game }: Props) => {
  const onTestMessage = () => {
    gameSocket.emit(GAME_WS_KEYS.TEST_MESSAGE, {
      gameId: game?.id,
      qweqwe: 'qweqwewe',
      someArray: [1, 2, 3],
      num: 4356,
    });
  };

  useEffect(() => {
    // sendMessage(GAME_WS_KEYS.JOIN_GAME, joinRes);
  }, []);

  return (
    <div>
      <Typography variant="h5">{game?.title}</Typography>

      <Box pt={2}>
        <Button variant="contained" onClick={onTestMessage}>
          Test message
        </Button>
      </Box>
    </div>
  );
};

export default GameplayView;

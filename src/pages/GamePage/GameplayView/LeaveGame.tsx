import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button } from '@mui/material';

import { leavePlayerFromGame } from 'api/players';
import { ROUTES } from 'constants/routes';
import { ConfirmDialog } from 'components/shared';
import { gameSocket, GAME_WS_KEYS } from 'webSocket';

type Props = {
  mainPlayerId: number;
  gameId: number;
  userId: number;
};

export const LeaveGame = ({ mainPlayerId, gameId, userId }: Props) => {
  const navigate = useNavigate();
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);

  const onOpenLeave = () => setLeaveModalOpen(true);
  const onCloseLeave = () => setLeaveModalOpen(false);

  const onLeaveGame = () => {
    leavePlayerFromGame(mainPlayerId).then(() => {
      gameSocket.emit(GAME_WS_KEYS.LEAVE_GAME, { gameId, userId });
      navigate(ROUTES.GAMES);
    });
  };

  return (
    <>
      <Box position="absolute" top="5px" right="5px">
        <Button size="small" onClick={onOpenLeave}>
          Leave game
        </Button>
      </Box>

      <ConfirmDialog
        title="Leave game"
        text="Are you sure you want to leave this game?"
        open={leaveModalOpen}
        onClose={onCloseLeave}
        onConfirm={onLeaveGame}
        confirnText="Leave"
      />
    </>
  );
};

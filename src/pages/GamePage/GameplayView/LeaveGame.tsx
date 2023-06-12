import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Box, Button } from '@mui/material';

import { leavePlayerFromGame } from 'api/players';
import { ROUTES } from 'constants/routes';
import { ConfirmDialog } from 'components/shared';
import { gameSocket, GAME_WS_KEYS } from 'webSocket';

type Props = {
  playerId: number;
  playerName: string;
  gameId: number;
  userId: number;
};

export const LeaveGame = ({ playerId, playerName, gameId, userId }: Props) => {
  const navigate = useNavigate();
  const [leaveModalOpen, setLeaveModalOpen] = useState(false);

  const onOpenLeave = () => setLeaveModalOpen(true);
  const onCloseLeave = () => setLeaveModalOpen(false);

  const onLeaveGame = () => {
    leavePlayerFromGame(playerId).then(() => {
      gameSocket.emit(GAME_WS_KEYS.LEAVE_GAME, { gameId, userId, playerName });
      navigate(ROUTES.GAMES);
    });
  };

  return (
    <>
      <Box position="absolute" top="5px" right="5px">
        <Button size="small" onClick={onOpenLeave}>
          Вийти з гри
        </Button>
      </Box>

      <ConfirmDialog
        title="Вийти з гри?"
        text="Напевно, мамуля покликала їсти?)"
        open={leaveModalOpen}
        onClose={onCloseLeave}
        onConfirm={onLeaveGame}
        confirnText="Точно, вийти!"
      />
    </>
  );
};

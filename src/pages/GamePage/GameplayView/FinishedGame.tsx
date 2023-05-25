import { Typography, Stack, Backdrop } from '@mui/material';

import { useAppSelector } from 'store';
import { getCurrentGame } from 'store/game';

export const FinishedGame = () => {
  const game = useAppSelector(getCurrentGame);
  const gameWinners = game.deals.reduce((acc, deal) => {
    const { vinnerId } = deal;
    if (!vinnerId) return acc;

    const victoryCount = (acc[vinnerId] ?? 0) + 1;
    return { ...acc, [vinnerId]: victoryCount };
  }, {} as { [vinnerId: string]: number });

  const gameWinnersArr = Object.entries(gameWinners);

  return (
    <Backdrop open>
      <Stack spacing={2} alignItems="center">
        {gameWinnersArr.map(([winner, victoryCount], index) => {
          const player = game.players.find(({ id }) => `${id}` === `${winner}`);
          return (
            <Typography key={index} variant="h5" color="white">
              #1 : {player?.name}
            </Typography>
          );
        })}
      </Stack>
    </Backdrop>
  );
};

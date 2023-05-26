import { Typography, Stack, Backdrop, Button } from '@mui/material';
import { Link } from 'react-router-dom';

import { ROUTES } from 'constants/routes';
import { useAppSelector } from 'store';
import { getCurrentGame } from 'store/game';

export const FinishedGame = () => {
  const game = useAppSelector(getCurrentGame);
  const players = game.players
    .map(player => ({
      userId: player.userId,
      name: player.name,
      victoryCount: game.deals.filter(deal => deal.winnerId === player.userId)
        .length,
    }))
    .sort((a, b) => b.victoryCount - a.victoryCount);

  return (
    <Backdrop open>
      <Stack spacing={2} alignItems="center">
        <Typography variant="h3" color="white">
          Game over
        </Typography>
        {players.map((player, index) => (
          <Typography key={index} variant="h5" color="white">
            #{index + 1} : {player?.name}. Wins: {player.victoryCount}
          </Typography>
        ))}
        <Link to={ROUTES.GAMES}>
          <Button variant="contained">Go to all games</Button>
        </Link>
      </Stack>
    </Backdrop>
  );
};

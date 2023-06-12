import { Box, Typography, Stack, Backdrop, Button } from '@mui/material';
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
      <Stack spacing={2}>
        <Typography variant="h3" color="white">
          Гра закінчена
        </Typography>
        {players.map((player, index) => (
          <Box key={index}>
            <Typography variant="h5" color="white">
              #{index + 1} : {player?.name}.
            </Typography>
            <Typography variant="subtitle1" color="white">
              Виграних раундів: {player.victoryCount}
            </Typography>
          </Box>
        ))}
        <Stack alignItems="center">
          <Link to={ROUTES.GAMES}>
            <Button variant="contained">Перейти до всіх ігор</Button>
          </Link>
        </Stack>
      </Stack>
    </Backdrop>
  );
};

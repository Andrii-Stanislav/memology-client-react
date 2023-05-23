import { Box, Paper, PaperProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { PLAYER_STATUS } from '../../../types/game';

import type { GameTableProps } from './types';

export const GameTable3Users = ({
  players,
  mainPlayer,
  cards,
}: GameTableProps) => {
  console.log('cards: ', cards);

  return (
    <Container>
      <CurrentUser isReady={mainPlayer?.status === PLAYER_STATUS.READY}>
        <PlayerName>{mainPlayer?.name}</PlayerName>
      </CurrentUser>
      {players[0] && (
        <FirstUser isReady={players[0].status === PLAYER_STATUS.READY}>
          <PlayerName>{players[0].name}</PlayerName>
        </FirstUser>
      )}
      {players[1] && (
        <SecondUser isReady={players[0].status === PLAYER_STATUS.READY}>
          <PlayerName>{players[1].name}</PlayerName>
        </SecondUser>
      )}
    </Container>
  );
};

const Container = styled(Box)`
  position: relative;
  height: 100%;
`;

interface PlayerElProps extends PaperProps {
  isReady: boolean;
}

const PlayerEl = styled(({ isReady, ...props }: PlayerElProps) => (
  <Paper elevation={6} {...props} />
))`
  position: absolute;
  width: 200px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${({ isReady }) => (isReady ? 'transparent' : 'gray')};
`;

const CurrentUser = styled(PlayerEl)`
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const FirstUser = styled(PlayerEl)`
  bottom: 50%;
  left: 0;
  transform: translateY(50%);
`;

const SecondUser = styled(PlayerEl)`
  bottom: 50%;
  right: 0;
  transform: translateY(50%);
`;

const PlayerName = styled(Typography)`
  text-transform: uppercase;
`;

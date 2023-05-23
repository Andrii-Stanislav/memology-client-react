import { Paper, PaperProps, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

import { PLAYER_STATUS } from '../../../types/game';

import type { GameTableProps } from './types';
import { CardsDialog } from './CardsDialog';

export const GameTable3Users = ({
  players,
  mainPlayer,
  cards,
}: GameTableProps) => {
  return (
    <>
      <CurrentUser isReady={mainPlayer?.status === PLAYER_STATUS.READY}>
        <CardsDialog cards={cards}>
          <PlayerName>{mainPlayer?.name}</PlayerName>
        </CardsDialog>
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
    </>
  );
};

interface PlayerElProps extends PaperProps {
  isReady: boolean;
}

const PlayerEl = styled(({ isReady, ...props }: PlayerElProps) => (
  <Paper elevation={6} {...props} />
))`
  position: absolute;
  width: 200px;
  height: 150px;
  border-radius: 50%;
  background-color: ${({ isReady }) => (isReady ? 'transparent' : 'gray')};
  overflow: hidden;
`;

const CurrentUser = styled(PlayerEl)`
  bottom: 10px;
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

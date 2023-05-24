import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material';

import {
  RunningLineLeft,
  RunningLineRight,
  GameTypography,
} from 'components/shared';
import { Game, GAME_STATUS } from 'types/game';

type Props = {
  game: Game;
  children: ReactNode;
};

export const GameBackground = ({ game, children }: Props) => {
  // game.status === GAME_STATUS.NOT_STARTED

  return (
    <Background>
      <RunningLineBox>
        <RunningLineLeft height="10vw">
          <GameName>{game?.title}</GameName>
        </RunningLineLeft>
        <RunningLineRight height="5vw">
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-around"
            gap={2}
            width="100%"
          >
            {game.status === GAME_STATUS.NOT_STARTED && (
              <>
                <InfoTypography>Whaiting for all users</InfoTypography>
                <InfoTypography>Whaiting for all users</InfoTypography>
                <InfoTypography>Whaiting for all users</InfoTypography>
                <InfoTypography>Whaiting for all users</InfoTypography>
              </>
            )}
          </Box>
        </RunningLineRight>
      </RunningLineBox>

      {children}
    </Background>
  );
};

const Background = styled(Box)`
  position: relative;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
`;

const RunningLineBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 40vh;
`;

const GameName = styled(GameTypography)`
  font-size: 8vw;
  text-transform: uppercase;
`;

const InfoTypography = styled(GameTypography)`
  font-size: 2vw;
`;

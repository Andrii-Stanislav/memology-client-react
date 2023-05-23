import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material';

import { RunningLine, GameTypography } from '../../components/shared';

type Props = {
  gameName: string;
  children: ReactNode;
};

export const GameBackground = ({ gameName, children }: Props) => {
  return (
    <Background>
      <RunningLineBox>
        <RunningLine height="100px">
          <GameName>{gameName}</GameName>
        </RunningLine>
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
  top: 60%;
  left: 0;
  width: 100%;
  height: 100px;
`;

const GameName = styled(GameTypography)`
  font-size: 8vw;
  text-transform: uppercase;
`;

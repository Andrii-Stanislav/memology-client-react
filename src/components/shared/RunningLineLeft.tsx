import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material';

type Props = {
  children: ReactNode;
  height?: string;
};

export const RunningLineLeft = ({ children, height = '65px' }: Props) => {
  return (
    <Wraper height={height}>
      <FirstTickerWrapper>{children}</FirstTickerWrapper>
      <SecondFirstTickerWrapper>{children}</SecondFirstTickerWrapper>
    </Wraper>
  );
};

const Wraper = styled(Box)`
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const FirstTickerWrapper = styled(Box)`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  animation: tickerLeftFirst 15s infinite linear forwards;

  @keyframes tickerLeftFirst {
    0% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(-100%, 0);
    }
  }
`;

const SecondFirstTickerWrapper = styled(FirstTickerWrapper)`
  animation: tickerLeftSecond 15s infinite linear forwards;

  @keyframes tickerLeftSecond {
    0% {
      transform: translate(100%, 0);
    }

    100% {
      transform: translate(0, 0);
    }
  }
`;

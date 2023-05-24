import { ReactNode } from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material';

type Props = {
  children: ReactNode;
  height?: string;
};

export const RunningLineRight = ({ children, height = '65px' }: Props) => {
  return (
    <Wraper height={height}>
      <InnerWraper height={height}>
        <FirstTickerWrapper>{children}</FirstTickerWrapper>
        <SecondFirstTickerWrapper>{children}</SecondFirstTickerWrapper>
      </InnerWraper>
    </Wraper>
  );
};

const Wraper = styled(Box)`
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const InnerWraper = styled(Box)`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 65px;
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
  animation: tickerRight 30s infinite linear forwards;

  @keyframes tickerRight {
    0% {
      transform: translate(-100%, 0);
    }

    50% {
      transform: translate(0, 0);
    }

    100% {
      transform: translate(100%, 0);
    }
  }
`;

const SecondFirstTickerWrapper = styled(FirstTickerWrapper)`
  transform: translate(-100%, 0);
  animation: 30s tickerRight 15s infinite linear forwards;
`;

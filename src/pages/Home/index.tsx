import { memo, Fragment } from 'react';
import { Container, Stack, Typography, Box } from '@mui/material';
import { styled } from '@mui/material';

import {
  RunningLineLeft,
  RunningLineRight,
  GameTypography,
} from 'components/shared';

const BackgroundRunningLines = memo(() => (
  <>
    {Array(8)
      .fill(null)
      .map((_, index) => (
        <Fragment key={index}>
          <RunningLineLeft height="6vw">
            <MemologyTypography>Memology</MemologyTypography>
            <MemologyTypography>Memology</MemologyTypography>
          </RunningLineLeft>
          <RunningLineRight height="6vw">
            <MemologyTypography>Memology</MemologyTypography>
            <MemologyTypography>Memology</MemologyTypography>
          </RunningLineRight>
        </Fragment>
      ))}
  </>
));

export const Home = () => {
  return (
    <Container component="main">
      <Background>
        <BackgroundRunningLines />
      </Background>
      <ContentBox>
        <Stack alignItems="center" spacing={4}>
          <Typography variant="h3">This is funny Memology game</Typography>
        </Stack>
      </ContentBox>
    </Container>
  );
};

const Background = styled(Box)`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  pointer-events: none;
  z-index: -1;
`;

const MemologyTypography = styled(GameTypography)`
  font-size: 4vw;
  text-transform: uppercase;
`;

const ContentBox = styled(Box)`
  position: relative;
  padding: 16px;
  background-color: #ffffff5c;
  border-radius: 16px;
`;

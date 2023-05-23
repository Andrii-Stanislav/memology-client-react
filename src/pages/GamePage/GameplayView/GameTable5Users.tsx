import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import type { GameTableProps } from './types';

export const GameTable5Users = ({ players, mainPlayer }: GameTableProps) => {
  return <Container>5</Container>;
};

const Container = styled(Box)`
  border: 1px solid red;
  border-radius: 50%;
  height: 100%;
`;

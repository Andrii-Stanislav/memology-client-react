import { Typography } from '@mui/material';
import { styled } from '@mui/material';

export const GameTypography = styled(Typography)`
  text-align: center;
  line-height: 1;

  @supports (background-clip: text) or (-webkit-background-clip: text) {
    background-image: linear-gradient(305deg, tomato, gold, cyan);
    background-size: 110% auto;
    background-position: center;
    color: transparent;
    -webkit-background-clip: text;
    background-clip: text;
  }
`;

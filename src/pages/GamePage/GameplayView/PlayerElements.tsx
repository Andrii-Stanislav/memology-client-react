import { Paper, PaperProps, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';

interface PlayerElProps extends PaperProps {
  isReady: boolean;
}

export const PlayerEl = styled(({ isReady, ...props }: PlayerElProps) => (
  <Paper elevation={6} {...props} />
))`
  position: absolute;
  width: 200px;
  height: 150px;
  border-radius: 50%;
  background-color: ${({ isReady }) => (isReady ? 'transparent' : 'gray')};
  overflow: hidden;
`;

export const CurrentUser = styled(PlayerEl)`
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

export const PlayerInnerBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

export const PlayerName = styled(Typography)`
  text-transform: uppercase;
`;

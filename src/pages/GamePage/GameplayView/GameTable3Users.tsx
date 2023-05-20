import { Box, BoxProps } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Player, PLAYER_STATUS } from '../../../types/game';

type Props = {
  players: Player[];
  mainPlayer: Player;
};

const GameTable3Users = ({ players, mainPlayer }: Props) => {
  // console.log('mainPlayer: ', mainPlayer);
  // console.log('players: ', players);

  return (
    <Container>
      <CurrentUser isReady={mainPlayer.status === PLAYER_STATUS.READY}>
        {mainPlayer.name}
      </CurrentUser>
      {players[0] && (
        <FirstUser isReady={players[0].status === PLAYER_STATUS.READY}>
          {players[0].name}
        </FirstUser>
      )}
      {players[1] && (
        <SecondUser isReady={players[0].status === PLAYER_STATUS.READY}>
          {players[1].name}
        </SecondUser>
      )}
    </Container>
  );
};

export default GameTable3Users;

const Container = styled(Box)`
  position: relative;
  height: 100%;
`;

interface PlayerElProps extends BoxProps {
  isReady: boolean;
}

const PlayerEl = styled(({ isReady, ...props }: PlayerElProps) => (
  <Box {...props} />
))`
  position: absolute;
  width: 200px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
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
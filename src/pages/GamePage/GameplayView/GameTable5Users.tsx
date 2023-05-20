import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

import { Player } from '../../../types/game';

type Props = {
  players: Player[];
  mainPlayer: Player;
};

const GameTable5Users = ({ players, mainPlayer }: Props) => {
  // console.log('mainPlayer: ', mainPlayer);
  // console.log('players: ', players);

  return <Container>5</Container>;
};

export default GameTable5Users;

const Container = styled(Box)`
  border: 1px solid red;
  border-radius: 50%;
  height: 100%;
`;

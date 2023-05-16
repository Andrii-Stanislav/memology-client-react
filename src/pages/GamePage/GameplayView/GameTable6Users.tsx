import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

type TablePlayer = {
  userId: number;
  name: string;
  isOnline: boolean;
};

type Props = {
  players: TablePlayer[];
  mainPlayer: TablePlayer;
};

const GameTable6Users = ({ players, mainPlayer }: Props) => {
  // console.log('mainPlayer: ', mainPlayer);
  // console.log('players: ', players);

  return <Container>6</Container>;
};

export default GameTable6Users;

const Container = styled(Box)`
  border: 1px solid red;
  border-radius: 50%;
  height: 100%;
`;

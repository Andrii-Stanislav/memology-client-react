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

const GameTable4Users = ({ players, mainPlayer }: Props) => {
  // console.log('mainPlayer: ', mainPlayer);
  // console.log('players: ', players);

  return (
    <Container>
      <CurrentUser>{mainPlayer.name}</CurrentUser>
      {players[0] && <FirstUser>{players[0].name}</FirstUser>}
      {players[0] && <SecondUser>{players[0].name}</SecondUser>}
      {players[0] && <ThirdUser>{players[0].name}</ThirdUser>}
    </Container>
  );
};

export default GameTable4Users;

const Container = styled(Box)`
  position: relative;
  border: 1px solid red;
  border-radius: 50%;
  height: 100%;
`;

const PlayerEl = styled(Box)`
  position: absolute;
  width: 15vw;
  height: 15vh;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #000;
  border-radius: 50%;
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
  top: 0;
  left: 50%;
  transform: translateX(-50%);
`;

const ThirdUser = styled(PlayerEl)`
  bottom: 50%;
  right: 0;
  transform: translateY(50%);
`;

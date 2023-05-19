import { Stack, Typography } from '@mui/material';

import { useAppSelector } from '../../store';
import { getUser } from '../../store/user';
import type { Game } from '../../types/game';

import JoinForm from '../Games/JoinForm';

type Props = {
  game: Game;
  afterJoin: () => void;
};

const JoinView = ({ game, afterJoin }: Props) => {
  const user = useAppSelector(getUser);

  const isCreator = user?.id === game?.creator?.id;

  const defaultValues = {
    gameId: game?.id,
    joinCode: isCreator ? game?.joinCode : '',
  };

  return (
    <Stack alignItems="center" spacing={2} py={2}>
      <Typography variant="h5">Join {isCreator ? 'your' : ''} game</Typography>
      <JoinForm
        disabledGameId
        disableJoinCode={isCreator}
        defaultValues={defaultValues}
        afterJoin={afterJoin}
      />
    </Stack>
  );
};

export default JoinView;

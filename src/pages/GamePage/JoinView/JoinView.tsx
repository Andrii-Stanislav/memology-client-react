import { Stack, Typography } from '@mui/material';

import { useAppSelector } from 'store';
import { getUser } from 'store/user';
import { hasNoGame, getCurrentGame } from 'store/game';
import { JoinForm } from 'pages/Games/JoinForm';

type Props = {
  afterJoin: () => void;
};

export const JoinView = ({ afterJoin }: Props) => {
  const user = useAppSelector(getUser);
  const game = useAppSelector(getCurrentGame);
  const noGame = useAppSelector(hasNoGame);

  if (noGame) {
    return null;
  }

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

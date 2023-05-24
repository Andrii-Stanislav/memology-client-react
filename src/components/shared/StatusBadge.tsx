import { Tooltip } from '@mui/material';

import {
  NotStarted,
  PlayCircleFilledWhite,
  CheckCircle,
} from '@mui/icons-material';

import { GAME_STATUS } from 'types/game';

type Props = {
  status: GAME_STATUS;
};

export const StatusBadge = ({ status }: Props) => {
  const title =
    status === GAME_STATUS.NOT_STARTED
      ? 'Not started'
      : status === GAME_STATUS.STARTED
      ? 'Started'
      : status === GAME_STATUS.FINISHED
      ? 'Finished'
      : '';

  return (
    <Tooltip title={title}>
      <div>
        {status === GAME_STATUS.NOT_STARTED && <NotStarted />}
        {status === GAME_STATUS.STARTED && <PlayCircleFilledWhite />}
        {status === GAME_STATUS.FINISHED && <CheckCircle />}
      </div>
    </Tooltip>
  );
};

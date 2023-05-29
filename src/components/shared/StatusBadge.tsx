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
      ? 'Ще не почалася'
      : status === GAME_STATUS.STARTED
      ? 'Розпочалася'
      : status === GAME_STATUS.FINISHED
      ? 'Гру закінчено'
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

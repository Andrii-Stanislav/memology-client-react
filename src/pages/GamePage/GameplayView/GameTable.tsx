import { useMemo } from 'react';

import type { GameTableProps } from './types';
import { GameTable3Users } from './GameTable3Users';
import { GameTable4Users } from './GameTable4Users';
import { GameTable5Users } from './GameTable5Users';
import { GameTable6Users } from './GameTable6Users';

const GameTableUnsaported = () => <></>;

export const GameTable = (props: GameTableProps) => {
  const Table = useMemo(
    () =>
      props.playersCount === 3
        ? GameTable3Users
        : props.playersCount === 4
        ? GameTable4Users
        : props.playersCount === 5
        ? GameTable5Users
        : props.playersCount === 6
        ? GameTable6Users
        : GameTableUnsaported,
    [props.playersCount],
  );

  return <Table {...props} />;
};

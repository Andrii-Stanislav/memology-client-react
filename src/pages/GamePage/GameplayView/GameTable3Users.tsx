import { styled } from '@mui/material/styles';
import { useMemo } from 'react';

import { PLAYER_STATUS } from 'types/game';

import { PlayerEl, PlayerInnerBox, PlayerName } from './PlayerElements';
import type { GameTableProps } from './types';

export const GameTable3Users = ({ players }: GameTableProps) => {
  const playersElements = useMemo(() => [FirstUser, SecondUser], []);

  return (
    <>
      {players.slice(0, 2).map((player, index) => {
        const PlayerElement = playersElements[index];
        return (
          <PlayerElement isReady={player.status === PLAYER_STATUS.READY}>
            <PlayerInnerBox>
              <PlayerName>{player.name}</PlayerName>
            </PlayerInnerBox>
          </PlayerElement>
        );
      })}
    </>
  );
};

const FirstUser = styled(PlayerEl)`
  bottom: 50%;
  left: 10px;
`;

const SecondUser = styled(PlayerEl)`
  bottom: 50%;
  right: 10px;
`;

import { styled } from '@mui/material/styles';
import { useMemo } from 'react';

import { PLAYER_STATUS } from 'types/game';

import { PlayerEl, PlayerInnerBox, PlayerName } from './PlayerElements';
import type { GameTableProps } from './types';

export const GameTable3Users = ({ players, currentDeal }: GameTableProps) => {
  const playersElements = useMemo(() => [FirstUser, SecondUser], []);

  return (
    <>
      {players.slice(0, 2).map((player, index) => {
        const PlayerElement = playersElements[index];
        return (
          <PlayerElement
            key={player.id}
            isReady={player.status === PLAYER_STATUS.READY}
            isJudge={player.userId === currentDeal?.judgeId}
          >
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

import { useMemo } from 'react';
import { styled } from '@mui/material/styles';

import { PLAYER_STATUS } from 'types/game';

import { PlayerEl, PlayerInnerBox, PlayerName } from './PlayerElements';
import type { GameTableProps } from './types';

export const GameTable4Users = ({ players, currentDeal }: GameTableProps) => {
  const playersElements = useMemo(() => [FirstUser, SecondUser, ThirdUser], []);

  return (
    <>
      {players.slice(0, 3).map((player, index) => {
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
  transform: translateY(50%);
`;

const SecondUser = styled(PlayerEl)`
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

const ThirdUser = styled(PlayerEl)`
  bottom: 50%;
  right: 10px;
  transform: translateY(50%);
`;

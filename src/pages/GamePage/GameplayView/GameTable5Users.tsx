import { useMemo } from 'react';
import { styled } from '@mui/material/styles';

import { PLAYER_STATUS } from 'types/game';

import { PlayerEl, PlayerInnerBox, PlayerName } from './PlayerElements';

import type { GameTableProps } from './types';

export const GameTable5Users = ({ players, currentDeal }: GameTableProps) => {
  const playersElements = useMemo(
    () => [FirstUser, SecondUser, ThirdUser, FourthUser],
    [],
  );

  return (
    <>
      {players.slice(0, 4).map((player, index) => {
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
  bottom: 35%;
  left: 10px;
`;

const SecondUser = styled(PlayerEl)`
  top: 10px;
  left: 10%;
`;

const ThirdUser = styled(PlayerEl)`
  top: 10px;
  right: 10%;
`;

const FourthUser = styled(PlayerEl)`
  bottom: 35%;
  right: 10px;
`;

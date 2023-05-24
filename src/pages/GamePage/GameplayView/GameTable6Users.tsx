import { useMemo } from 'react';
import { styled } from '@mui/material/styles';

import { PLAYER_STATUS } from '../../../types/game';

import { PlayerEl, PlayerInnerBox, PlayerName } from './PlayerElements';

import type { GameTableProps } from './types';

export const GameTable6Users = ({ players }: GameTableProps) => {
  const playersElements = useMemo(
    () => [FirstUser, SecondUser, ThirdUser, FourthUser, FifthUser],
    [],
  );

  return (
    <>
      {players.slice(0, 5).map((player, index) => {
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
  bottom: 15%;
  left: 10px;
`;

const SecondUser = styled(PlayerEl)`
  top: 15%;
  left: 10px;
`;

const ThirdUser = styled(PlayerEl)`
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
`;

const FourthUser = styled(PlayerEl)`
  top: 15%;
  right: 10px;
`;

const FifthUser = styled(PlayerEl)`
  bottom: 15%;
  right: 10px;
`;

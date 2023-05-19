import { useEffect } from 'react';

import { gameSocket, GAME_WS_KEYS } from '../../ws';

type Props = {
  gameId?: string;
  updateGame: () => void;
  updatePlayers: () => void;
};

const useGameSocket = ({ gameId, updateGame, updatePlayers }: Props) => {
  useEffect(() => {
    const onPlayerJoin = (args: { userId: number }) => {
      updateGame();
      updatePlayers();
    };

    const onPlayerLeave = (args: { userId: number }) => {
      updatePlayers();
    };

    const onTest = (args: any) => {
      console.log('TEST_MESSAGE: ', args);
    };

    gameSocket.on(`${GAME_WS_KEYS.JOIN_GAME}/${gameId}`, onPlayerJoin);
    gameSocket.on(`${GAME_WS_KEYS.LEAVE_GAME}/${gameId}`, onPlayerLeave);
    gameSocket.on(`${GAME_WS_KEYS.TEST_MESSAGE}/${gameId}`, onTest);

    return () => {
      gameSocket.off(`${GAME_WS_KEYS.JOIN_GAME}/${gameId}`, onPlayerJoin);
      gameSocket.off(`${GAME_WS_KEYS.LEAVE_GAME}/${gameId}`, onPlayerLeave);
      gameSocket.off(`${GAME_WS_KEYS.TEST_MESSAGE}/${gameId}`, onTest);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);
};

export default useGameSocket;

import { useEffect } from 'react';

import { gameSocket, GAME_WS_KEYS } from '../../ws';

type Props = {
  gameId?: string;
};

const useGameSocket = ({ gameId }: Props) => {
  //
  useEffect(() => {
    // const onPlayerJoin = (args: any) => {
    //   console.log('JOIN_GAME: ', args);
    // };

    const onTest = (args: any) => {
      console.log('TEST_MESSAGE: ', args);
    };

    // socket.on(`${GAME_WS_KEYS.JOIN_GAME}/${gameId}`, onPlayerJoin);
    gameSocket.on(`${GAME_WS_KEYS.TEST_MESSAGE}/${gameId}`, onTest);

    return () => {
      // socket.off(`${GAME_WS_KEYS.JOIN_GAME}/${gameId}`, onPlayerJoin);
      gameSocket.off(`${GAME_WS_KEYS.TEST_MESSAGE}/${gameId}`, onTest);
    };
  }, [gameId]);
};

export default useGameSocket;

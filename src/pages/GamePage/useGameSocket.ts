import { useEffect } from 'react';

import { useAppDispatch } from '../../store';
import { onJoinPlayer, onLeavePlayer } from '../../store/games';
import { gameSocket, GAME_WS_KEYS } from '../../ws';

type Props = {
  gameId?: string;
};

const useGameSocket = ({ gameId }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onPlayerJoin = (args: { userId: number }) => {
      dispatch(onJoinPlayer(args.userId));
    };

    const onPlayerLeave = (args: { userId: number }) => {
      console.log('onPlayerLeave');
      dispatch(onLeavePlayer(args.userId));
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
  }, [dispatch, gameId]);
};

export default useGameSocket;

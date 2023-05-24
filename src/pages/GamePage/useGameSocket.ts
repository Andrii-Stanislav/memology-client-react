import { useEffect } from 'react';

import { useAppDispatch } from 'store';
import { removePlayerFromGame, setPlayerReady } from 'store/game';
import { gameSocket, GAME_WS_KEYS } from 'webSocket';

type Props = {
  gameId?: string;
  updateGame: () => void;
};

export const useGameSocket = ({ gameId, updateGame }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onPlayerJoin = (args: { userId: number }) => {
      updateGame();
    };

    const onPlayerLeave = (args: { userId: number }) => {
      dispatch(removePlayerFromGame(args.userId));
    };

    const onPlayerReady = (args: { userId: number }) => {
      dispatch(setPlayerReady(args.userId));
    };

    const onGameStarted = () => {
      updateGame();
    };

    gameSocket.on(`${GAME_WS_KEYS.JOIN_GAME}/${gameId}`, onPlayerJoin);
    gameSocket.on(`${GAME_WS_KEYS.LEAVE_GAME}/${gameId}`, onPlayerLeave);
    gameSocket.on(`${GAME_WS_KEYS.READY_FOR_GAME}/${gameId}`, onPlayerReady);
    gameSocket.on(`${GAME_WS_KEYS.GAME_STARTED}/${gameId}`, onGameStarted);

    return () => {
      gameSocket.off(`${GAME_WS_KEYS.JOIN_GAME}/${gameId}`, onPlayerJoin);
      gameSocket.off(`${GAME_WS_KEYS.LEAVE_GAME}/${gameId}`, onPlayerLeave);
      gameSocket.off(`${GAME_WS_KEYS.READY_FOR_GAME}/${gameId}`, onPlayerReady);
      gameSocket.off(`${GAME_WS_KEYS.GAME_STARTED}/${gameId}`, onGameStarted);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);
};

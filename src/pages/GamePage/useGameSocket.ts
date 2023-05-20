import { useEffect } from 'react';

import { setPlayerReady } from '../../store/games';
import { useAppDispatch } from '../../store';

import { gameSocket, GAME_WS_KEYS } from '../../ws';

type Props = {
  gameId?: string;
  updateGame: () => void;
  updatePlayers: () => void;
};

const useGameSocket = ({ gameId, updateGame, updatePlayers }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onPlayerJoin = (args: { userId: number }) => {
      updateGame();
      updatePlayers();
    };

    const onPlayerLeave = (args: { userId: number }) => {
      updatePlayers();
    };

    const onPlayerReady = (args: { userId: number }) => {
      dispatch(setPlayerReady(args.userId));
    };

    const onGameStarted = () => {
      // TODO
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

export default useGameSocket;

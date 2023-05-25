import { useEffect } from 'react';

import { useAppDispatch } from 'store';
import {
  removePlayerFromGame,
  setPlayerReady,
  setCurrentDealStarted,
  addNewBet,
} from 'store/game';
import { gameSocket, GAME_WS_KEYS } from 'webSocket';
import type { Bet } from 'types/game';

type Props = {
  gameId?: string;
  updateGame: () => void;
};

export const useGameSocket = ({ gameId, updateGame }: Props) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const onPlayerJoin = () => {
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

    const onDealStarted = () => {
      dispatch(setCurrentDealStarted());
    };

    const onBetCreate = (newBet: Bet) => {
      dispatch(addNewBet(newBet));
    };

    const onDealFinished = () => {
      updateGame();
    };

    const onNewDeal = () => {
      updateGame();
    };

    gameSocket.on(`${GAME_WS_KEYS.JOIN_GAME}/${gameId}`, onPlayerJoin);
    gameSocket.on(`${GAME_WS_KEYS.LEAVE_GAME}/${gameId}`, onPlayerLeave);
    gameSocket.on(`${GAME_WS_KEYS.READY_FOR_GAME}/${gameId}`, onPlayerReady);
    gameSocket.on(`${GAME_WS_KEYS.GAME_STARTED}/${gameId}`, onGameStarted);
    gameSocket.on(`${GAME_WS_KEYS.DEAL_STARTED}/${gameId}`, onDealStarted);
    gameSocket.on(`${GAME_WS_KEYS.CREATE_BET}/${gameId}`, onBetCreate);
    gameSocket.on(`${GAME_WS_KEYS.DEAL_FINISHED}/${gameId}`, onDealFinished);
    gameSocket.on(`${GAME_WS_KEYS.CREATE_NEW_DEAL}/${gameId}`, onNewDeal);

    return () => {
      gameSocket.off(`${GAME_WS_KEYS.JOIN_GAME}/${gameId}`, onPlayerJoin);
      gameSocket.off(`${GAME_WS_KEYS.LEAVE_GAME}/${gameId}`, onPlayerLeave);
      gameSocket.off(`${GAME_WS_KEYS.READY_FOR_GAME}/${gameId}`, onPlayerReady);
      gameSocket.off(`${GAME_WS_KEYS.GAME_STARTED}/${gameId}`, onGameStarted);
      gameSocket.off(`${GAME_WS_KEYS.DEAL_STARTED}/${gameId}`, onDealStarted);
      gameSocket.off(`${GAME_WS_KEYS.CREATE_BET}/${gameId}`, onBetCreate);
      gameSocket.off(`${GAME_WS_KEYS.DEAL_FINISHED}/${gameId}`, onDealFinished);
      gameSocket.off(`${GAME_WS_KEYS.CREATE_NEW_DEAL}/${gameId}`, onNewDeal);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);
};

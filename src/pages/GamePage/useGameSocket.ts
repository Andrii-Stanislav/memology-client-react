import { useEffect } from 'react';
import { toast } from 'react-toastify';

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
      toast.info('+ 1 гравець у грі');
    };

    const onPlayerLeave = (args: { userId: number; playerName: string }) => {
      dispatch(removePlayerFromGame(args.userId));
      toast.info(`Гравець "${args.playerName}" покинув гру((`);
    };

    const onPlayerReady = (args: { userId: number }) => {
      dispatch(setPlayerReady(args.userId));
    };

    const onGameStarted = () => {
      updateGame();
      toast.info('Гра починається!)');
    };

    const onDealStarted = () => {
      dispatch(setCurrentDealStarted());
    };

    const onBetCreate = (newBet: Bet) => {
      dispatch(addNewBet(newBet));
      toast.info('Зацініть новий мем');
    };

    const onDealFinished = () => {
      updateGame();
      toast.info('Роздачу завершено!');
    };

    const onNewDeal = () => {
      updateGame();
      toast.info('Нова роздача!');
    };

    const onFinishGame = () => {
      updateGame();
      toast.info('Гру закінчено!');
    };

    gameSocket.on(`${GAME_WS_KEYS.JOIN_GAME}/${gameId}`, onPlayerJoin);
    gameSocket.on(`${GAME_WS_KEYS.LEAVE_GAME}/${gameId}`, onPlayerLeave);
    gameSocket.on(`${GAME_WS_KEYS.READY_FOR_GAME}/${gameId}`, onPlayerReady);
    gameSocket.on(`${GAME_WS_KEYS.GAME_STARTED}/${gameId}`, onGameStarted);
    gameSocket.on(`${GAME_WS_KEYS.DEAL_STARTED}/${gameId}`, onDealStarted);
    gameSocket.on(`${GAME_WS_KEYS.CREATE_BET}/${gameId}`, onBetCreate);
    gameSocket.on(`${GAME_WS_KEYS.DEAL_FINISHED}/${gameId}`, onDealFinished);
    gameSocket.on(`${GAME_WS_KEYS.CREATE_NEW_DEAL}/${gameId}`, onNewDeal);
    gameSocket.on(`${GAME_WS_KEYS.GAME_FINISHED}/${gameId}`, onFinishGame);

    return () => {
      gameSocket.off(`${GAME_WS_KEYS.JOIN_GAME}/${gameId}`, onPlayerJoin);
      gameSocket.off(`${GAME_WS_KEYS.LEAVE_GAME}/${gameId}`, onPlayerLeave);
      gameSocket.off(`${GAME_WS_KEYS.READY_FOR_GAME}/${gameId}`, onPlayerReady);
      gameSocket.off(`${GAME_WS_KEYS.GAME_STARTED}/${gameId}`, onGameStarted);
      gameSocket.off(`${GAME_WS_KEYS.DEAL_STARTED}/${gameId}`, onDealStarted);
      gameSocket.off(`${GAME_WS_KEYS.CREATE_BET}/${gameId}`, onBetCreate);
      gameSocket.off(`${GAME_WS_KEYS.DEAL_FINISHED}/${gameId}`, onDealFinished);
      gameSocket.off(`${GAME_WS_KEYS.CREATE_NEW_DEAL}/${gameId}`, onNewDeal);
      gameSocket.off(`${GAME_WS_KEYS.GAME_FINISHED}/${gameId}`, onFinishGame);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameId]);
};

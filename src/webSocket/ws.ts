import { Manager } from 'socket.io-client';

const socketManager = new Manager(
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_BASE_URL
    : process.env.REACT_APP_LOCAL_BASE_URL,
  {
    autoConnect: false,
  },
);

export const gameSocket = socketManager.socket('/game', {});

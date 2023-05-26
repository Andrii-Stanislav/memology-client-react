import { Manager } from 'socket.io-client';

const socketManager = new Manager(process.env.REACT_API_BASE_URL, {
  autoConnect: false,
});

export const gameSocket = socketManager.socket('/game', {});

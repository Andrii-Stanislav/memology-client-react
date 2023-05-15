import { Manager } from 'socket.io-client';

const socketManager = new Manager('http://localhost:5001', {
  autoConnect: false,
});

export const gameSocket = socketManager.socket('/game', {});

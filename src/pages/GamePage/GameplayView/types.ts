import { Player, Deal } from 'types/game';

export type GameTableProps = {
  playersCount: number;
  players: Player[];
  currentDeal: Deal | null;
};

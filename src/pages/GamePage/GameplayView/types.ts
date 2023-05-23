import { Player } from '../../../types/game';
import { Meme } from '../../../types/meme';

export type GameTableProps = {
  players: Player[];
  mainPlayer: Player;
  cards: Meme[];
};

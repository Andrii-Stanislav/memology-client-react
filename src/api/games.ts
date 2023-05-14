import api from "./ApiService";
import type { Game } from "../types/game";

export const getGameById = (gameId: string) =>
  api.get<Game>(`/games/${gameId}`);

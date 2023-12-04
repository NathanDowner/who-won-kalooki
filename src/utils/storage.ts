import { Player } from '@/models/player.interface';
import { INITIAL_SCORES } from './constants';

const STORAGE_PREFIX = 'who_w_k_';

export const storage = {
  setScores: (rounds: Record<string, number[]>) => {
    localStorage.setItem(`${STORAGE_PREFIX}rounds`, JSON.stringify(rounds));
  },

  setPlayers: (players: Player[]) => {
    localStorage.setItem(`${STORAGE_PREFIX}players`, JSON.stringify(players));
  },

  getScores: (): Record<string, number[]> => {
    const rounds = localStorage.getItem(`${STORAGE_PREFIX}rounds`);
    if (rounds) {
      return JSON.parse(rounds);
    }

    return INITIAL_SCORES;
  },

  getPlayers: (): Player[] => {
    const players = localStorage.getItem(`${STORAGE_PREFIX}players`);
    if (players) {
      return JSON.parse(players);
    }

    return [];
  },

  clearData: () => {
    localStorage.removeItem(`${STORAGE_PREFIX}rounds`);
    localStorage.removeItem(`${STORAGE_PREFIX}players`);
  },
};

import { Timestamp } from 'firebase-admin/firestore';
import { Player } from './player.interface';

export interface Game {
  type: GameType;
  id: string;
  endedAt: Timestamp;
  players: Player[];
  playerUserNames: string[];
  isComplete: boolean;
  winner: Player;
  creator: Player;
  scores: Record<string, number[]>;
}

export enum GameType {
  Kalooki = 'Kalooki',
}

import { Timestamp } from 'firebase-admin/firestore';

export type Game = {
  type: GameType;
  id: string;
  endedAt: Timestamp;
  players: Player[];
  playerUserNames: string[];
  isComplete: boolean;
  winner: Player;
  creator: Player;
  scores: Record<string, number[]>;
};

export enum GameType {
  Kalooki = 'Kalooki',
}

export interface Player {
  name: string;
  id?: string;
  imgUrl?: string;
  userName?: string;
}

import {
  DocumentData,
  FirestoreDataConverter,
  Timestamp,
  WithFieldValue,
} from 'firebase/firestore';
import { GameType } from './gameType.enum';
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

export type CreateGameDto = Omit<Game, 'id'>;

export type UpdateGameDto = Partial<Game> & { id: string };

export type GameStats = {
  wins: number;
  losses: number;
  gameName: string;
};

export const gameConverter: FirestoreDataConverter<Game> = {
  toFirestore(game: WithFieldValue<CreateGameDto>): DocumentData {
    return {
      type: game.type,
      endedAt: game.endedAt,
      players: game.players,
      isComplete: game.isComplete,
      winner: game.winner,
      creator: game.creator,
      scores: game.scores,
      playerUserNames: game.playerUserNames,
    };
  },
  fromFirestore(snapshot, options): Game {
    const data = snapshot.data(options)!;
    return {
      type: data.type as GameType,
      id: snapshot.id,
      isComplete: data.isComplete,
      endedAt: data.endedAt,
      players: data.players,
      winner: data.winner,
      creator: data.creator,
      scores: data.scores,
      playerUserNames: data.playerUserNames,
    };
  },
};

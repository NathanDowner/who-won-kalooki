import {
  DocumentData,
  FirestoreDataConverter,
  serverTimestamp,
  WithFieldValue,
} from 'firebase/firestore';
import { GameType } from './gameType.enum';
import { Player } from './player.interface';

export interface Game {
  type: GameType;
  id: string;
  endedAt: number;
  players: Player[];
  isComplete: boolean;
  winner: Player;
  creator: Player;
  scores: Record<string, number[]>;
}

export type CreateGameDto = Omit<Game, 'id' | 'endedAt'>;

export const gameConverter: FirestoreDataConverter<Game> = {
  toFirestore(game: WithFieldValue<CreateGameDto>): DocumentData {
    return {
      type: game.type,
      endedAt: serverTimestamp(),
      players: game.players,
      isComplete: game.isComplete,
      winner: game.winner,
      creator: game.creator,
      scores: game.scores,
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
    };
  },
};

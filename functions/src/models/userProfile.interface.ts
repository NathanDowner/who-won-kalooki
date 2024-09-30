import {
  DocumentData,
  FirestoreDataConverter,
  WithFieldValue,
} from 'firebase-admin/firestore';
import { GameType } from './game.interface';

export interface UserProfile {
  id: string;
  fullName: string;
  email: string;
  userName: string;
  imgUrl?: string;
  games?: Partial<Record<GameType, WinLoss>>; // {[key in GameType]: WinLoss}
}

interface WinLoss {
  wins: number;
  losses: number;
}

export const profileConverter: FirestoreDataConverter<UserProfile> = {
  toFirestore(profile: WithFieldValue<UserProfile>): DocumentData {
    return {
      fullName: profile.fullName,
      email: profile.email,
      userName: profile.userName,
      imgUrl: profile.imgUrl,
    };
  },
  fromFirestore(snapshot): UserProfile {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      fullName: data.fullName,
      email: data.email,
      userName: data.userName,
      imgUrl: data.imgUrl,
      games: data.games,
    };
  },
};

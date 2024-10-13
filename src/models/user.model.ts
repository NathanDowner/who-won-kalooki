import {
  DocumentData,
  FirestoreDataConverter,
  WithFieldValue,
} from 'firebase/firestore';
import { GameType } from './gameType.enum';

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  userName: string;
  imgUrl?: string;
  games?: { [key in GameType]: WinLoss }; // Partial<Record<GameType, WinLoss>>; this results in an error in ProfilePage.tsx
};

type WinLoss = {
  wins: number;
  losses: number;
};

export type CreateProfileDto = Omit<UserProfile, 'fullName'> & {
  firstName: string;
  lastName: string;
};

export const profileConverter: FirestoreDataConverter<UserProfile> = {
  toFirestore(profile: WithFieldValue<UserProfile>): DocumentData {
    return {
      fullName: profile.fullName,
      email: profile.email,
      userName: profile.userName,
      imgUrl: profile.imgUrl,
      games: profile.games,
    };
  },
  fromFirestore(snapshot, options): UserProfile {
    const data = snapshot.data(options)!;
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

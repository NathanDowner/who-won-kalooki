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
  games?: Partial<Record<GameType, WinLoss>>; // {[key in GameType]: WinLoss}
};

type WinLoss = {
  wins: number;
  losses: number;
};

// const userProfile: UserProfile = {
//   id: '1',
//   fullName: 'nathan downer',
//   email: 'nathan@gmail.com',
//   userName: 'nnawdr',
//   games: {
//     Kalooki: {
//       wins: 0,
//       losses: 0
//     }

//   }
// };

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

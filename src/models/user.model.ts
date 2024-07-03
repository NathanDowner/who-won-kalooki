import {
  DocumentData,
  FirestoreDataConverter,
  WithFieldValue,
} from 'firebase/firestore';

export type UserProfile = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
};

export const profileConverter: FirestoreDataConverter<UserProfile> = {
  toFirestore(profile: WithFieldValue<UserProfile>): DocumentData {
    return {
      id: profile.id,
      firstName: profile.firstName,
      lastName: profile.lastName,
      email: profile.email,
      userName: profile.userName,
    };
  },
  fromFirestore(snapshot, options): UserProfile {
    const data = snapshot.data(options)!;
    return {
      id: data.id,
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      userName: data.userName,
    };
  },
};

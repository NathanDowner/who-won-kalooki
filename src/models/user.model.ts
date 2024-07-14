import {
  DocumentData,
  FirestoreDataConverter,
  WithFieldValue,
} from 'firebase/firestore';

export type UserProfile = {
  id: string;
  fullName: string;
  email: string;
  userName: string;
  imgUrl?: string;
};

export const profileConverter: FirestoreDataConverter<UserProfile> = {
  toFirestore(profile: WithFieldValue<UserProfile>): DocumentData {
    return {
      fullName: profile.fullName,
      email: profile.email,
      userName: profile.userName,
      imgUrl: profile.imgUrl,
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
    };
  },
};

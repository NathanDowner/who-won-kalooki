import {
  DocumentData,
  FirestoreDataConverter,
  serverTimestamp,
  Timestamp,
  WithFieldValue,
} from 'firebase/firestore';
import { UserProfile } from '../../../models/user.model';

type ID = string;

export interface Friendship {
  status: FriendshipStatus;
  initiator: ID; // userId
  ids: ID[];
  friendInfo: Record<ID, FriendInfo>;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  id: ID;
}

export interface SimplifiedFriendshipInfo {
  isInitiator: boolean;
  status: FriendshipStatus;
  friendShipId: ID;
  otherUserId: ID;
}

export type FriendInfo = Pick<
  UserProfile,
  'id' | 'userName' | 'imgUrl' | 'fullName'
>;

export enum FriendshipStatus {
  Pending = 'pending',
  Accepted = 'accepted',
  Declined = 'declined',
}

export const friendshipConverter: FirestoreDataConverter<Friendship> = {
  toFirestore(friendship: WithFieldValue<Friendship>): DocumentData {
    return {
      status: friendship.status,
      initiator: friendship.initiator,
      ids: friendship.ids,
      friendInfo: friendship.friendInfo,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };
  },
  fromFirestore(snapshot, options): Friendship {
    const data = snapshot.data(options)!;
    return {
      status: data.status,
      initiator: data.initiator,
      ids: data.ids,
      friendInfo: data.friendInfo,
      createdAt: data.createdAt,
      updatedAt: data.updatedAt,
      id: snapshot.id,
    };
  },
};

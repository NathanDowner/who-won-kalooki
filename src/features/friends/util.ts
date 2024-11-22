import {
  FriendInfo,
  Friendship,
  FriendshipStatus,
} from './types/friend.interface';

export const getPendingFriendRequests = (friendship: Friendship) =>
  friendship.status === FriendshipStatus.Pending;

export const getFriends = (friendship: Friendship) =>
  friendship.status === FriendshipStatus.Accepted;

export const toFriendInfo =
  (userId: string) =>
  (friendship: Friendship): FriendInfo => {
    const friendId = friendship.ids.find((id) => id !== userId)!;
    const friendProfile: FriendInfo = friendship.friendInfo[friendId];

    return friendProfile;
  };

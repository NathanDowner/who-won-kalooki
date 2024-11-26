import {
  FriendInfo,
  Friendship,
  FriendshipStatus,
  SimplifiedFriendshipInfo,
} from './types/friend.interface';

export const getPendingFriendRequests =
  (userId: string) => (friendship: Friendship) =>
    friendship.status === FriendshipStatus.Pending &&
    friendship.initiator !== userId;

export const getFriends = (friendship: Friendship) =>
  friendship.status === FriendshipStatus.Accepted;

export const toFriendInfo =
  (userId: string) =>
  (friendship: Friendship): FriendInfo => {
    const friendId = friendship.ids.find((id) => id !== userId)!;
    const friendProfile: FriendInfo = friendship.friendInfo[friendId];

    return friendProfile;
  };

export const toSimplifiedFriendship = (
  friendship: Friendship,
  userId: string,
): SimplifiedFriendshipInfo =>
  toSimplifiedFriendshipCurried(userId)(friendship);

export const toSimplifiedFriendshipCurried =
  (userId: string) =>
  (friendship: Friendship): SimplifiedFriendshipInfo => {
    const isInitiator = friendship.initiator === userId;
    const otherUserId = friendship.ids.find((id) => id !== userId)!;
    const profile = friendship.friendInfo[otherUserId];

    return {
      isInitiator,
      status: friendship.status,
      friendShipId: friendship.id,
      otherUserId,
      profile,
    };
  };

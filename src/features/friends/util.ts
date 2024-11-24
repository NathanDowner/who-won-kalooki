import {
  FriendInfo,
  Friendship,
  FriendshipStatus,
  SimplifiedFriendshipInfo,
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

export const toSimplifiedFriendship = (
  friendship: Friendship,
  userId: string,
): SimplifiedFriendshipInfo => {
  const isInitiator = friendship.initiator === userId;
  const otherUserId = friendship.ids.find((id) => id !== userId)!;

  return {
    isInitiator,
    status: friendship.status,
    friendShipId: friendship.id,
    otherUserId,
  };
};

import { UserProfile } from '@/models/user.model';
import {
  FriendshipStatus,
  SimplifiedFriendshipInfo,
} from '../types/friend.interface';
import Card from '@/components/Card';
import defaultUserImg from '@/assets/default-user.svg';
import Button from '@/components/Button';
import {
  CreateFriendshipDto,
  useSendFriendRequest,
} from '../api/sendFriendRequest';
import { useAuth } from '@/contexts/AuthContext';
import { useRespondToFriendRequest } from '../api/respondToFriendRequest';
import { useCancelFriendRequest } from '../api/cancelFriendRequest';

type FriendRequestCardProps = {
  user: UserProfile;
  onCancel: (friendshipId: string) => void;
  friendship?: SimplifiedFriendshipInfo; // or maybe they access the friendships from the store
};

export const FriendRequestCard = ({
  user,
  onCancel,
  friendship,
}: FriendRequestCardProps) => {
  const { userProfile } = useAuth();
  const { isLoading: isSending, execute: sendRequest } = useSendFriendRequest();

  const { isLoading: isUpdating, execute: updateFriendRequest } =
    useRespondToFriendRequest();

  const { isLoading: isCancelling, execute: cancelFriendRequest } =
    useCancelFriendRequest();

  function handleSendRequest(selectedPlayer: UserProfile) {
    const friendRequest: CreateFriendshipDto = {
      status: FriendshipStatus.Pending,
      initiator: userProfile!.id,
      ids: [userProfile!.id, selectedPlayer!.id],
      friendInfo: {
        [userProfile!.id]: userProfile!,
        [selectedPlayer!.id]: selectedPlayer!,
      },
    };

    sendRequest(friendRequest);
  }

  function handleUpdateRequest(newStatus: FriendshipStatus) {
    updateFriendRequest({
      friendshipId: friendship!.friendShipId,
      status: newStatus,
    });
  }

  const isFriend = friendship?.status === FriendshipStatus.Accepted;

  const canRespondToRequest =
    friendship &&
    friendship.status === FriendshipStatus.Pending &&
    !friendship.isInitiator;

  const canCancelRequest =
    friendship &&
    friendship.status === FriendshipStatus.Pending &&
    friendship.isInitiator;

  const canAddFriend = !friendship;

  return (
    <Card className="flex gap-4">
      <img
        src={user.imgUrl ?? defaultUserImg}
        className={`border-gray-700 border-4 rounded-full w-24 h-24`}
      />
      <div className="flex-grow flex flex-col">
        {/* Info */}
        <div>
          <h2 className="truncate-text text-xl">{user.fullName}</h2>
          <p className="italic text-lg">@{user.userName}</p>
        </div>

        {/* Actions */}
        <div className="mt-auto">
          {canCancelRequest && (
            <Button
              size="sm"
              expanded
              loading={isCancelling}
              onClick={() => cancelFriendRequest(friendship.friendShipId)}
            >
              Cancel
            </Button>
          )}

          {canAddFriend && (
            <Button
              size="sm"
              expanded
              loading={isSending}
              onClick={() => handleSendRequest(user)}
            >
              + Add Friend
            </Button>
          )}

          {isFriend && (
            <Button size="sm" expanded disabled>
              Already Friends
            </Button>
          )}

          {canRespondToRequest && (
            <div className="flex gap-2 [&>*]:flex-shrink">
              <Button
                size="sm"
                expanded
                loading={isUpdating}
                onClick={() => handleUpdateRequest(FriendshipStatus.Accepted)}
              >
                Accept
              </Button>
              <Button
                size="sm"
                expanded
                loading={isUpdating}
                onClick={() => handleUpdateRequest(FriendshipStatus.Declined)}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

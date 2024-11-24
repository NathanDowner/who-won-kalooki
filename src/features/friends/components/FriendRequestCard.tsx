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
} from '../api/useSendFriendRequest';
import { useAuth } from '@/contexts/AuthContext';

type FriendRequestCardProps = {
  user: UserProfile;
  onAccept: (friendshipId: string) => void;
  onDecline: (friendshipId: string) => void;
  onCancel: (friendshipId: string) => void;
  friendship?: SimplifiedFriendshipInfo; // or maybe they access the friendships from the store
};

export const FriendRequestCard = ({
  user,
  onAccept,
  onDecline,
  onCancel,
  friendship,
}: FriendRequestCardProps) => {
  const { userProfile } = useAuth();
  const { isLoading: sendRequestLoading, execute: sendRequest } =
    useSendFriendRequest();

  async function handleSendRequest(selectedPlayer: UserProfile) {
    const friendRequest: CreateFriendshipDto = {
      status: FriendshipStatus.Pending,
      initiator: userProfile!.id,
      ids: [userProfile!.id, selectedPlayer!.id],
      friendInfo: {
        [userProfile!.id]: userProfile!,
        [selectedPlayer!.id]: selectedPlayer!,
      },
    };

    await sendRequest(friendRequest);
  }

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
            <Button size="sm" expanded>
              Cancel
            </Button>
          )}

          {canAddFriend && (
            <Button
              size="sm"
              expanded
              loading={sendRequestLoading}
              onClick={() => handleSendRequest(user)}
            >
              + Add Friend
            </Button>
          )}

          {canRespondToRequest && (
            <div className="flex gap-2 [&>*]:flex-shrink">
              <Button size="sm" expanded>
                Accept
              </Button>
              <Button size="sm" expanded>
                Reject
              </Button>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

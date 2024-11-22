import Button from '@/components/Button';
import PlayerCard from '@/components/PlayerCard';
import PlayerSearchbar from '@/components/PlayerSearchbar';
import { UserProfile } from '@/models/user.model';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import {
  CreateFriendshipDto,
  useSendFriendRequest,
} from '../api/useSendFriendRequest';
import { Friendship, FriendshipStatus } from '../types/friend.interface';

interface AddFriendModalProps {
  onClose: () => void;
  friendships: Friendship[];
}

const AddFriendModal = ({ friendships, onClose }: AddFriendModalProps) => {
  const [selectedPlayer, setSelectedPlayer] = useState<UserProfile>();
  const { userProfile } = useAuth();
  const { isLoading, updateDocument: sendRequest } =
    useSendFriendRequest(onClose);

  async function handleSendRequest() {
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

  function handleRemovePlayer() {
    setSelectedPlayer(undefined);
  }

  return (
    <div className="text-center">
      <p>Find by full name or user name!</p>
      {selectedPlayer ? (
        <>
          <div className="flex flex-col justify-center my-6">
            <PlayerCard
              playerName={selectedPlayer.fullName}
              imgUrl={selectedPlayer.imgUrl}
            />
            <ArrowsRightLeftIcon className="h-6" />
            <PlayerCard
              playerName={userProfile!.fullName}
              imgUrl={userProfile!.imgUrl}
            />
          </div>
          <Button onClick={handleRemovePlayer} btnStyle="error">
            x
          </Button>
          <Button loading={isLoading} onClick={() => handleSendRequest()}>
            Send Friend Request
          </Button>
        </>
      ) : (
        <PlayerSearchbar onSelectPlayer={setSelectedPlayer} />
      )}

      <h2>OR</h2>

      <Button>Share Invite</Button>
    </div>
  );
};

export default AddFriendModal;

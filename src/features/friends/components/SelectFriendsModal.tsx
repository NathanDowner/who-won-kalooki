import { SimpleUserProfile } from '@/models/user.model';
import PlayerCard from '@/components/PlayerCard';
import { useState } from 'react';
import Button from '@/components/Button';

type Props = {
  onSelectFriends: (friends: SimpleUserProfile[]) => void;
  friends: SimpleUserProfile[];
  selectedFriendIds: string[];
};

const SelectFriendsModal = ({
  onSelectFriends,
  friends,
  selectedFriendIds,
}: Props) => {
  const [selectedFriendsIds, setSelectedFriendsIds] = useState<string[]>([]);

  function handleClick(friendId: string) {
    if (selectedFriendsIds.includes(friendId)) {
      setSelectedFriendsIds((prev) => prev.filter((f) => f !== friendId));
    } else {
      setSelectedFriendsIds((prev) => [...prev, friendId]);
    }
  }

  function handleAddFriends() {
    const selectedFriends = friends.filter((friend) =>
      selectedFriendsIds.includes(friend.id),
    );

    onSelectFriends(selectedFriends.map((friend) => friend));
  }

  return (
    <div>
      <p className="text-center mb-4">Select friends to add to the game!</p>
      <div className="space-y-2">
        {friends.map((friend) => (
          <PlayerCard
            key={friend.id}
            user={friend}
            isSelected={
              selectedFriendsIds.includes(friend.id) ||
              selectedFriendIds.includes(friend.id)
            }
            onClick={() => handleClick(friend.id)}
          />
        ))}
      </div>

      <footer className="button-container">
        <Button onClick={handleAddFriends} expanded size="lg">
          Add Friends
        </Button>
      </footer>
    </div>
  );
};

export default SelectFriendsModal;

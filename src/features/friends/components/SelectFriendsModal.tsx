import { SimpleUserProfile } from '@/models/user.model';
import { useAppSelector } from '@/store/hooks';
import React from 'react';
import { selectConfirmedFriends } from '../store/friendsSlice';
import PlayerCard from '@/components/PlayerCard';

type Props = {
  onSelectFriends: (friends: SimpleUserProfile[]) => void;
};

const SelectFriendsModal = ({ onSelectFriends }: Props) => {
  const friends = useAppSelector(selectConfirmedFriends);

  return (
    <div>
      <p className="text-center mb-4">Select friends to add to the game!</p>
      <div className="space-y-2">
        {friends.map((friend) => (
          <PlayerCard key={friend.friendShipId} user={friend.profile} />
        ))}
      </div>
    </div>
  );
};

export default SelectFriendsModal;

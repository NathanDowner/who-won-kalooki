import AppHeader from '@/components/AppHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { BellIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import AddFriendModal from '../components/AddFriendModal';
import { useState } from 'react';
import { SimplifiedFriendshipInfo } from '../types/friend.interface';
import { FullScreenModal } from '@/components/FullScreenModal';
import { FriendRequestCard } from '../components/FriendRequestCard';
import Portal from '@/components/Portal';
import PlayerCard from '@/components/PlayerCard';
import {
  selectConfirmedFriends,
  selectFriends,
  selectPendingFriendRequests,
} from '../store/friendsSlice';
import { useAppSelector } from '@/store/hooks';

const FriendsPage = () => {
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);

  const pendingFriendRequests: SimplifiedFriendshipInfo[] = useAppSelector(
    selectPendingFriendRequests,
  );
  const confirmedFriends = useAppSelector(selectConfirmedFriends);
  const friendships = useAppSelector(selectFriends);

  return (
    <div className="page">
      <AppHeader
        title="Friends"
        showShadow
        rightActionBtn={{
          icon: BellIcon,
          label: 'Friend Notifications',
          onClick: () => console.log('Friend Notifications Clicked'),
          type: 'button',
        }}
      />

      {/* Pending requests */}
      {pendingFriendRequests.length > 0 && (
        <div className=" pt-6 mb-4 space-y-2">
          <h2 className="text-lg font-semibold">Pending Requests</h2>
          {pendingFriendRequests.map((friend) => (
            <FriendRequestCard key={friend.friendShipId} friendship={friend} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-6 mb-4">
        <h2 className="text-lg font-semibold">My Friends</h2>
        <Button
          btnStyle="outline"
          size="sm"
          onClick={() => setShowAddFriendModal(true)}
        >
          <UserPlusIcon className="h-6" />
        </Button>
      </div>

      {!confirmedFriends.length && (
        <Card className="">
          <p className="font-semibold">You have no friends yet</p>
          <p>Use the botton above to find and connect with your friends!</p>
        </Card>
      )}

      <div className="space-y-2">
        {confirmedFriends.map((friend) => (
          <PlayerCard key={friend.id} user={friend} />
        ))}
      </div>

      <Portal>
        <FullScreenModal
          title="Add Friend"
          isOpen={showAddFriendModal}
          onClose={() => setShowAddFriendModal(false)}
        >
          <AddFriendModal
            friendships={friendships ?? []}
            onClose={() => setShowAddFriendModal(false)}
          />
        </FullScreenModal>
      </Portal>
    </div>
  );
};

export default FriendsPage;

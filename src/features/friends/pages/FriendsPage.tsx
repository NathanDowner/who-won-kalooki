import AppHeader from '@/components/AppHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { BellIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { useGetFriends } from '../api/getFriends';
import { useAuth } from '@/contexts/AuthContext';
import AddFriendModal from '../components/AddFriendModal';
import { useEffect, useState } from 'react';
import { SimplifiedFriendshipInfo } from '../types/friend.interface';
import { toSimplifiedFriendshipCurried } from '../util';
import { FullScreenModal } from '@/components/FullScreenModal';
import { FriendRequestCard } from '../components/FriendRequestCard';
import Portal from '@/components/Portal';
import PlayerCard from '@/components/PlayerCard';
import {
  selectConfirmedFriends,
  selectPendingFriendRequests,
  setFriends,
} from '../store/friendsSlice';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

const FriendsPage = () => {
  const { user } = useAuth();
  const [friendships, loadingFriends, error] = useGetFriends(user!.uid);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);
  const dispatch = useAppDispatch();

  const pendingFriendRequests: SimplifiedFriendshipInfo[] = useAppSelector(
    selectPendingFriendRequests,
  );
  const confirmedFriends = useAppSelector(selectConfirmedFriends);

  useEffect(() => {
    if (friendships) {
      dispatch(
        setFriends(friendships.map(toSimplifiedFriendshipCurried(user!.uid))),
      );
    }
  }, [friendships]);

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
          disabled={loadingFriends}
          onClick={() => setShowAddFriendModal(true)}
        >
          <UserPlusIcon className="h-6" />
        </Button>
      </div>
      {loadingFriends && (
        <Card className="flex flex-col gap-4">
          <div className="skeleton h-4 w-20 font-semibold " />
          <div className="skeleton h-4 w-full" />
        </Card>
      )}

      {!loadingFriends && !confirmedFriends.length && (
        <Card className="">
          <p className="font-semibold">You have no friends yet</p>
          <p>Use the botton above to find and connect with your friends!</p>
        </Card>
      )}

      {error && (
        <Card className="text-center border-red-500">
          <p>Error: {error.message}</p>
        </Card>
      )}

      <div className="space-y-2">
        {confirmedFriends.map(({ profile }) => (
          <PlayerCard key={profile.id} user={profile} />
        ))}
      </div>

      <Portal>
        <FullScreenModal
          title="Add Friend"
          isOpen={showAddFriendModal}
          onClose={() => setShowAddFriendModal(false)}
          children={
            <AddFriendModal
              friendships={friendships ?? []}
              onClose={() => setShowAddFriendModal(false)}
            />
          }
        />
      </Portal>
    </div>
  );
};

export default FriendsPage;

import AppHeader from '@/components/AppHeader';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { BellIcon, UserPlusIcon } from '@heroicons/react/24/outline';
import { useGetFriends } from '../api/useGetFriends';
import { useAuth } from '@/contexts/AuthContext';
import PlayerCard from '@/components/PlayerCard';
import AddFriendModal from '../components/AddFriendModal';
import { useMemo, useState } from 'react';
import { FriendInfo } from '../types/friend.interface';
import { getFriends, getPendingFriendRequests, toFriendInfo } from '../util';
import { FullScreenModal } from '@/components/FullScreenModal';

const FriendsPage = () => {
  const { user } = useAuth();
  const [friendships, loadingFriends, error] = useGetFriends(user!.uid);
  const [showAddFriendModal, setShowAddFriendModal] = useState(false);

  const friends: FriendInfo[] = useMemo(() => {
    if (!friendships) return [];

    return friendships.filter(getFriends).map(toFriendInfo(user!.uid));
  }, [friendships, user]);

  const pendingFriendRequests: FriendInfo[] = useMemo(() => {
    if (!friendships) return [];

    return friendships
      .filter(getPendingFriendRequests)
      .map(toFriendInfo(user!.uid));
  }, [friendships, user]);

  return (
    <div className="page">
      <AppHeader
        title="Friends"
        rightActionBtn={{
          icon: BellIcon,
          label: 'Friend Notifications',
          onClick: () => console.log('Friend Notifications Clicked'),
          type: 'button',
        }}
      />

      {/* Pending requests */}
      {pendingFriendRequests.length > 0 && (
        <div className=" pt-6 mb-4">
          <h2 className="text-lg font-semibold">Pending Requests</h2>
          {pendingFriendRequests.map((friend) => (
            <PlayerCard
              key={friend.id}
              playerName={friend.fullName}
              imgUrl={friend.imgUrl}
            />
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

      {!loadingFriends && !friends.length && (
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

      {friends.map((friend) => (
        <PlayerCard
          key={friend.id}
          playerName={friend.fullName}
          imgUrl={friend.imgUrl}
        />
      ))}

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
    </div>
  );
};

export default FriendsPage;

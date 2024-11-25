import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  Friendship,
  SimplifiedFriendshipInfo,
} from '../types/friend.interface';
import Input from '@/components/Input';
import { useUserSearch } from '@/features/user';
import { useDebouncedValue } from '@mantine/hooks';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import { FriendRequestCard } from './FriendRequestCard';
import { toSimplifiedFriendship } from '../util';

interface AddFriendModalProps {
  onClose: () => void;
  friendships: Friendship[];
}

const AddFriendModal = ({ friendships }: AddFriendModalProps) => {
  const { userProfile } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedValue] = useDebouncedValue(searchTerm, 750);

  const {
    isLoading: usersLoading,
    data: users,
    execute: searchUsers,
  } = useUserSearch();

  useEffect(() => {
    if (debouncedValue) {
      searchUsers(debouncedValue);
    }
  }, [debouncedValue]);

  function findFriendshipById(
    userId: string,
  ): SimplifiedFriendshipInfo | undefined {
    const found = friendships.find((friendship) =>
      friendship.ids.includes(userId),
    );

    if (found) {
      return toSimplifiedFriendship(found, userProfile!.id);
    }
  }

  return (
    <div className="">
      <Input
        type="search"
        name="search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for friends "
      />
      {!usersLoading && !users!.length && !searchTerm && (
        <div className="text-center mt-12">
          <MagnifyingGlassCircleIcon className="h-24 mx-auto mb-4" />
          <h3 className="font-bold">Find Friends</h3>
          <p>
            Search for your friends using their names or usernames. All searches
            are case sensitive.
          </p>
        </div>
      )}

      <div className="space-y-2">
        {users!.map((user) => (
          <div key={user.id}>
            <FriendRequestCard
              user={user}
              friendship={findFriendshipById(user.id)}
            />
          </div>
        ))}
      </div>
    </div>
    // <div className="text-center">
    //   <p>Find by full name or user name!</p>
    //   {selectedPlayer ? (
    //     <>
    //       <div className="flex flex-col justify-center my-6">
    //         <PlayerCard
    //           playerName={selectedPlayer.fullName}
    //           imgUrl={selectedPlayer.imgUrl}
    //         />
    //         <ArrowsRightLeftIcon className="h-6" />
    //         <PlayerCard
    //           playerName={userProfile!.fullName}
    //           imgUrl={userProfile!.imgUrl}
    //         />
    //       </div>
    //       <Button onClick={handleRemovePlayer} btnStyle="error">
    //         x
    //       </Button>
    //       <Button loading={sendRequestLoading} onClick={() => handleSendRequest()}>
    //         Send Friend Request
    //       </Button>
    //     </>
    //   ) : (
    //     <PlayerSearchbar onSelectPlayer={setSelectedPlayer} />
    //   )}

    //   <h2>OR</h2>

    //   <Button>Share Invite</Button>
    // </div>
  );
};

export default AddFriendModal;

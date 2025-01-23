import { useEffect, useRef, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import {
  // Friendship,
  SimplifiedFriendshipInfo,
} from '../types/friend.interface';
import Input from '@/components/Input';
import { useUserSearch } from '@/features/user';
import { useDebouncedValue } from '@mantine/hooks';
import { MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';
import { FriendRequestCard } from './FriendRequestCard';
// import { toSimplifiedFriendship } from '../util';
import { UserProfile } from '@/models/user.model';

interface AddFriendModalProps {
  onClose: () => void;
  friendships: SimplifiedFriendshipInfo[];
}

const AddFriendModal = ({ friendships }: AddFriendModalProps) => {
  const { userProfile } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedValue] = useDebouncedValue(searchTerm, 750);
  const [users, setUsers] = useState<UserProfile[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const { isLoading: usersLoading, execute: searchUsers } = useUserSearch(
    (data) => setUsers(processUsers(data)),
  );

  useEffect(() => {
    if (debouncedValue) {
      searchUsers(debouncedValue);
    } else {
      setUsers([]);
    }
  }, [debouncedValue]);

  useEffect(() => {
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, []);

  function processUsers(users: UserProfile[]): UserProfile[] {
    return users.filter((user) => user.id !== userProfile!.id);
  }

  function findFriendshipById(
    userId: string,
  ): SimplifiedFriendshipInfo | undefined {
    return friendships.find((friendship) => friendship.otherUserId === userId);
  }

  return (
    <div className="">
      <Input
        ref={searchInputRef}
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
  );
};

export default AddFriendModal;

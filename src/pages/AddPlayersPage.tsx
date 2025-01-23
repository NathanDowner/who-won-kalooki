import AddPlayerCard from '@/components/AddPlayerCard';
import AppHeader from '@/components/AppHeader';
import { FullScreenModal } from '@/components/FullScreenModal';
import PlayerSearchbar from '@/components/PlayerSearchbar';
import Portal from '@/components/Portal';
import { useAuth } from '@/contexts/AuthContext';
import { selectConfirmedFriends } from '@/features/friends';
import SelectFriendsModal from '@/features/friends/components/SelectFriendsModal';
import { Player } from '@/models/player.interface';
import { SimpleUserProfile } from '@/models/user.model';
import { useAppSelector } from '@/store/hooks';
import { PlusIcon, UserGroupIcon } from '@heroicons/react/24/outline';

import { useEffect, useRef, useState } from 'react';

interface AddPlayersPageProps {
  onStartGame: (players: Player[]) => void;
  startGameBtnText?: string;
}

const AddPlayersPage = ({
  onStartGame,
  startGameBtnText = 'Start Game',
}: AddPlayersPageProps) => {
  const { user, userProfile } = useAuth();

  const inputRef = useRef<HTMLInputElement>(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);
  const [showAddFriendsModal, setShowAddFriendsModal] = useState(false);
  const friends = useAppSelector(selectConfirmedFriends);

  useEffect(() => {
    if (user && user.displayName && user.photoURL && userProfile) {
      setPlayers([
        {
          id: userProfile.id,
          name: user.displayName,
          imgUrl: user.photoURL,
          userName: userProfile.userName,
        },
      ]);
    }
    inputRef.current?.focus();
  }, []);

  function handleStartGame() {
    if (!newPlayerName) {
      return onStartGame(players);
    }

    const newPlayer: Player = { name: newPlayerName.trim() };

    setPlayers((players) => {
      const newPlayers = [...players, newPlayer];
      onStartGame(newPlayers);
      return newPlayers;
    });
  }

  function updatePlayer(index: number, player: Player) {
    setPlayers((prev) => prev.map((p, idx) => (index == idx ? player : p)));
  }

  function addPlayer(newPlayer: Player, focusInput = true) {
    setPlayers((prev) => [...prev, newPlayer]);
    setNewPlayerName('');

    if (!focusInput) return;

    const scrollPromise = new Promise((resolve) => {
      setTimeout(() => {
        inputRef.current?.scrollIntoView({
          behavior: 'smooth',
          block: 'center',
        });
        resolve(true);
      }, 0);
    });

    scrollPromise.then(() => {
      inputRef.current?.focus();
    });
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newPlayerName) return;

    const newPlayer: Player = {
      name: newPlayerName,
    };

    addPlayer(newPlayer);
  };

  function addPlayerFromSearch(player: SimpleUserProfile) {
    addPlayer(
      {
        id: player.id,
        name: player.fullName,
        imgUrl: player.imgUrl,
        userName: player.userName,
      },
      false,
    );
  }

  function handleAddFriends(friends: SimpleUserProfile[]) {
    friends.forEach((friend) => {
      addPlayerFromSearch(friend);
    });
    setShowAddFriendsModal(false);
  }

  return (
    <div className="page">
      <AppHeader title="Add Players" showShadow />
      {user && userProfile && (
        <>
          <label htmlFor="player-search">
            Find users in Who Won by name or username!
          </label>
          <PlayerSearchbar onSelectPlayer={addPlayerFromSearch} />
        </>
      )}

      <div className="space-y-4 mx-2 mb-20 mt-4 ">
        {players.map((player, idx) => (
          <AddPlayerCard
            key={player.name}
            player={player}
            onChange={(player) => updatePlayer(idx, player)}
          />
        ))}

        <form
          onSubmit={handleSubmit}
          className={`flex gap-4 items-center border-4 text-xl border-gray-700 p-3 rounded-md`}
        >
          <div className="border-4 border-gray-700 rounded-full w-14 h-14 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            name="name"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Enter player name"
            className="input input-ghost -ml-1 pl-0 flex-1 text-xl"
          />
        </form>
        {/* Add Player instructions */}

        <div className="text-center text-gray-500 text-sm">
          <p>Hit enter/return after inputting a name to save it!</p>
        </div>
      </div>
      <Portal>
        <FullScreenModal
          isOpen={showAddFriendsModal}
          onClose={() => setShowAddFriendsModal(false)}
          title="Select Friends"
        >
          <SelectFriendsModal
            onSelectFriends={handleAddFriends}
            selectedFriendIds={players.filter((p) => p.id).map((p) => p.id!)}
            friends={friends}
          />
        </FullScreenModal>
      </Portal>

      <footer className="button-container">
        {friends.length != 0 && (
          <button
            onClick={() => setShowAddFriendsModal(true)}
            className="btn btn-lg w-full -space-x-3 items-center flex-[1]"
          >
            <PlusIcon className="h-4 w-4" />
            <UserGroupIcon className="h-6 w-6" />
          </button>
        )}
        <button
          disabled={players.length < 2}
          onClick={handleStartGame}
          className="btn btn-lg w-full flex-[4]"
        >
          {startGameBtnText}
        </button>
      </footer>
    </div>
  );
};

export default AddPlayersPage;

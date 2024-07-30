import AddPlayerCard from '@/components/AddPlayerCard';
import AppHeader from '@/components/AppHeader';
import ButtonContainer from '@/components/ButtonContainer';
import PlayerSearchbar from '@/components/PlayerSearchbar';
import { useAuth } from '@/contexts/AuthContext';
import { Player } from '@/models/player.interface';
import { UserProfile } from '@/models/user.model';
import { AppRoutes } from '@/routes';
import { useAppDispatch } from '@/store/hooks';
import { bulkAddPlayers } from '@/store/playersSlice';
import { setInitialScores } from '@/store/scoreSlice';
import { storage } from '@/utils/storage';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddPlayersPage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user, userProfile } = useAuth();

  const inputRef = useRef<HTMLInputElement>(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);

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

  const handleStartRound = () => {
    dispatch(bulkAddPlayers(players));
    dispatch(setInitialScores(players.length));
    storage.clearData(); // TODO: Remove when back btn is added
    storage.setPlayers(players);
    navigate(AppRoutes.round('333'));
  };

  function updatePlayer(index: number, player: Player) {
    setPlayers((prev) => prev.map((p, idx) => (index == idx ? player : p)));
  }

  function addPlayer(newPlayer: Player) {
    setPlayers((prev) => [...prev, newPlayer]);
    setNewPlayerName('');

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

  function addPlayerFromSearch(player: UserProfile) {
    addPlayer({
      id: player.id,
      name: player.fullName,
      imgUrl: player.imgUrl,
      userName: player.userName,
    });
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
        {players.length <= 2 && (
          <div className="text-center text-gray-500 text-sm">
            <p>Hit enter/return after inputting a name to save it!</p>
          </div>
        )}
      </div>
      <ButtonContainer>
        <button
          disabled={players.length < 2}
          onClick={handleStartRound}
          className="btn btn-lg w-full"
        >
          Start Round
        </button>
      </ButtonContainer>
    </div>
  );
};

export default AddPlayersPage;

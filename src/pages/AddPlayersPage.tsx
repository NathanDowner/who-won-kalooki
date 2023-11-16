import ButtonContainer from '@/components/ButtonContainer';
import PlayerCard from '@/components/PlayerCard';
import { useAuth } from '@/contexts/AuthContext';
import useSetPageTitle from '@/hooks/useSetPageTitle';
import { Player } from '@/models/player.interface';
import { AppRoutes } from '@/routes';
import { useAppDispatch } from '@/store/hooks';
import { bulkAddPlayers } from '@/store/playersSlice';
import { setInitialScores } from '@/store/scoreSlice';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const AddPlayersPage = ({}: Props) => {
  useSetPageTitle('Add Players');

  const { user } = useAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [players, setPlayers] = useState<Player[]>([
    { name: user?.displayName!, image: user?.photoURL! },

    ...Array.from({ length: 3 }, (_, i) => ({
      name: `Player${i + 2}`,
      image: `https://avatar.iran.liara.run/public/boy?username=Player${i + 2}`,
    })),
  ]);

  const handleAddPlayer = () => {
    setShowAddUserForm(true);

    if (inputRef.current) {
      inputRef.current.scrollIntoView({ behavior: 'smooth' });
      inputRef.current.focus();
    }
  };

  const handleStartRound = () => {
    dispatch(bulkAddPlayers(players));
    dispatch(setInitialScores(players.length));
    navigate(AppRoutes.round('333'));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPlayer: Player = {
      name: newPlayerName,
      image: `https://avatar.iran.liara.run/public/boy?username=Player${newPlayerName}`,
    };

    setPlayers((prev) => [...prev, newPlayer]);
    setShowAddUserForm(false);
    setNewPlayerName('');
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="space-y-4 mx-2 mb-20 ">
        {players.map((player) => (
          <PlayerCard key={player.name} player={player} />
        ))}

        <form
          onSubmit={handleSubmit}
          className={`${
            showAddUserForm ? 'visible' : 'invisible'
          } flex gap-4 items-center border-4 text-xl border-gray-700 p-3 rounded-md`}
        >
          <div className="border-4 border-gray-700 rounded-full w-14 h-14" />
          <input
            ref={inputRef}
            type="text"
            name="name"
            value={newPlayerName}
            onChange={(e) => setNewPlayerName(e.target.value)}
            placeholder="Player name"
            className="input input-ghost -ml-1 pl-0 flex-1 text-xl"
          />
        </form>
      </div>
      <ButtonContainer>
        <button onClick={handleAddPlayer} className="btn btn-lg text-3xl">
          +
        </button>
        <button onClick={handleStartRound} className="btn btn-lg flex-1">
          Start Round
        </button>
      </ButtonContainer>
    </div>
  );
};

export default AddPlayersPage;

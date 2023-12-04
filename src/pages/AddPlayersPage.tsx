import ButtonContainer from '@/components/ButtonContainer';
import PlayerCard from '@/components/PlayerCard';
import useSetPageTitle from '@/hooks/useSetPageTitle';
import { Player } from '@/models/player.interface';
import { AppRoutes } from '@/routes';
import { useAppDispatch } from '@/store/hooks';
import { bulkAddPlayers } from '@/store/playersSlice';
import { setInitialScores } from '@/store/scoreSlice';
import { storage } from '@/utils/storage';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const AddPlayersPage = ({}: Props) => {
  useSetPageTitle('Add Players');

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const [newPlayerName, setNewPlayerName] = useState('');
  const [players, setPlayers] = useState<Player[]>([]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleStartRound = () => {
    dispatch(bulkAddPlayers(players));
    dispatch(setInitialScores(players.length));
    storage.setPlayers(players);
    navigate(AppRoutes.round('333'));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPlayer: Player = {
      name: newPlayerName,
      image: `https://avatar.iran.liara.run/public/boy?username=Player${newPlayerName}`,
    };

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
  };

  return (
    <div className="page">
      <div className="space-y-4 mx-2 mb-20 ">
        {players.map((player) => (
          <PlayerCard key={player.name} player={player} />
        ))}

        <form
          onSubmit={handleSubmit}
          className={`flex gap-4 items-center border-4 text-xl border-gray-700 p-3 rounded-md`}
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

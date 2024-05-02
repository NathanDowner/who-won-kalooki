import ButtonContainer from '@/components/ButtonContainer';
import PreviousGameCard from '@/components/PreviousGameCard';
import { useAuth } from '@/contexts/AuthContext';
import { useTitle } from '@/contexts/TitleContext';
import { useGetPreviousGames } from '@/lib/firebase';
import { Game } from '@/models/game.interface';
import { AppRoutes } from '@/routes';
import { useAppDispatch } from '@/store/hooks';
import { bulkAddPlayers } from '@/store/playersSlice';
import { bulkSetRoundScores, setGameId } from '@/store/scoreSlice';
import { findLastRoundPlayed } from '@/utils';
import { storage } from '@/utils/storage';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const PreviousGamesPage = () => {
  const { user } = useAuth();
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [games, loading, error] = useGetPreviousGames(user!.uid);

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);

  useEffect(() => {
    setTitle('Previous Games');
  }, []);

  function handleResumeGame() {
    dispatch(bulkSetRoundScores(selectedGame!.scores));
    dispatch(bulkAddPlayers(selectedGame!.players));
    dispatch(setGameId(selectedGame!.id));
    storage.setPlayers(selectedGame!.players);
    storage.setGameId(selectedGame!.id);

    const lastRoundPlayed = findLastRoundPlayed(selectedGame!.scores);
    navigate(AppRoutes.round(lastRoundPlayed));
  }

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="page">
          <p className="text-center text-xl mb-6">
            Select the game you'd like to resume
          </p>
          {error && <p>Error: {error.message}</p>}
          {games?.length === 0 && <p>No games found</p>}
          <div className="space-y-4">
            {games?.map((game) => (
              <PreviousGameCard
                onSelectGame={() => setSelectedGame(game)}
                isSelected={selectedGame?.id === game.id}
                key={game.id}
                game={game}
              />
            ))}
          </div>
        </div>
      )}
      <ButtonContainer>
        <button
          disabled={selectedGame === null}
          onClick={handleResumeGame}
          className="btn btn-lg w-full"
        >
          Resume Game
        </button>
      </ButtonContainer>
    </>
  );
};

export default PreviousGamesPage;

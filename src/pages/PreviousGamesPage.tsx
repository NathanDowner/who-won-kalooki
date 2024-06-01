import PreviousGameCard from '@/components/PreviousGameCard';
import { useAuth } from '@/contexts/AuthContext';
import { useTitle } from '@/contexts/TitleContext';
import { useGetPreviousGames } from '@/lib/firebase';
import { Game } from '@/models/game.interface';
import { AppRoutes } from '@/routes';
import { useAppDispatch } from '@/store/hooks';
import { bulkAddPlayers } from '@/store/playersSlice';
import { bulkSetRoundScores } from '@/store/scoreSlice';
import { findLastRoundPlayed } from '@/utils';
import { storage } from '@/utils/storage';
import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const FILTER_TABS = ['Complete', 'Incomplete'];

const PreviousGamesPage = () => {
  const { user } = useAuth();
  const { setTitle } = useTitle();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [games, loading, error] = useGetPreviousGames(user!.uid);

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [activeTab, setActiveTab] = useState(
    searchParams.get('filter') || 'complete',
  );

  useEffect(() => {
    setTitle('Previous Games');
  }, []);

  function handleResumeGame() {
    dispatch(bulkSetRoundScores(selectedGame!.scores));
    dispatch(bulkAddPlayers(selectedGame!.players));
    storage.setPlayers(selectedGame!.players);
    storage.setGameId(selectedGame!.id);

    const lastRoundPlayed = findLastRoundPlayed(selectedGame!.scores);
    navigate(AppRoutes.round(lastRoundPlayed));
  }

  function handleDeleteGame() {}

  function handleViewGame() {}

  function handleSelectTab(tab: string) {
    setActiveTab(tab);
    setSearchParams({ filter: tab });
  }

  function filterGames(game: Game) {
    if (activeTab.toLowerCase() === 'complete') {
      return game.isComplete;
    }

    return !game.isComplete;
  }

  return (
    <div className="page">
      <div
        className="tabs flex tabs-boxed w-4/5 mb-4 md:w-1/2 mx-auto"
        role="tablist"
      >
        {FILTER_TABS.map((tab) => (
          <button
            onClick={() => handleSelectTab(tab)}
            key={tab}
            className={clsx('tab flex-1', {
              'tab-active': activeTab.toLowerCase() == tab.toLowerCase(),
            })}
            role="tab"
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p className="text-center text-xl mb-6">
            Select the game for more option!
          </p>
          {error && <p>Error: {error.message}</p>}
          {games?.length === 0 && <p>No games found</p>}
          <div className="space-y-4">
            {games
              ?.filter(filterGames)
              .map((game) => (
                <PreviousGameCard
                  onSelectGame={() => setSelectedGame(game)}
                  onResumeGame={handleResumeGame}
                  onDeleteGame={() => {}}
                  onViewGame={() => {}}
                  isSelected={selectedGame?.id === game.id}
                  key={game.id}
                  game={game}
                />
              ))}
          </div>
        </div>
      )}
      {/* <ButtonContainer>
        <button
          disabled={selectedGame === null}
          onClick={handleResumeGame}
          className="btn btn-lg w-full"
        >
          Resume Game
        </button>
      </ButtonContainer> */}
    </div>
  );
};

export default PreviousGamesPage;

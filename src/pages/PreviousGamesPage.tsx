import { Animations } from '@/components/animations';
import PreviousGameCard from '@/components/PreviousGameCard';
import { useAuth } from '@/contexts/AuthContext';
import { deleteGame, useGetPreviousGames } from '@/lib/firebase';
import { Game } from '@/models/game.interface';
import { AppRoutes } from '@/routes';
import { useAppDispatch } from '@/store/hooks';
import { bulkAddPlayers, clearPlayers } from '@/store/playersSlice';
import {
  bulkSetRoundScores,
  resetScores as clearScores,
} from '@/store/scoreSlice';
import { findLastRoundPlayed } from '@/utils';
import { storage } from '@/utils/storage';
import clsx from 'clsx';
import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ScoreSheetPage from './ScoreSheetPage';
import Portal from '@/components/Portal';
import ConfirmationModal from '@/components/ConfirmationModal';
import toast from 'react-hot-toast';
import AppHeader from '@/components/AppHeader';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

const FILTER_TABS = ['Complete', 'Incomplete'];

const PreviousGamesPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const [games, loading, error] = useGetPreviousGames(user!.uid);

  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const [showScoreSheet, setShowScoreSheet] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [activeTab, setActiveTab] = useState(
    searchParams.get('filter') || 'incomplete',
  );

  function setStores(game: Game) {
    dispatch(bulkSetRoundScores(game.scores));
    dispatch(bulkAddPlayers(game.players));
  }

  function resetStores() {
    dispatch(clearPlayers());
    dispatch(clearScores());
  }

  function handleResumeGame() {
    setStores(selectedGame!);
    storage.setPlayers(selectedGame!.players);
    storage.setGameId(selectedGame!.id);

    const lastRoundPlayed = findLastRoundPlayed(selectedGame!.scores);
    navigate(AppRoutes.round(lastRoundPlayed));
  }

  function onDeleteGame() {
    setShowDeleteConfirmation(true);
  }

  function confirmDeleteGame() {
    toast.promise(deleteGame(selectedGame!.id), {
      loading: 'Deleting game...',
      success: 'Game deleted',
      error: 'Failed to delete game',
    });
  }

  function handleViewGame() {
    setStores(selectedGame!);
    setShowScoreSheet(true);
  }

  function handleCloseScoreSheet() {
    setShowScoreSheet(false);
    resetStores();
  }

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
      <AppHeader
        title="Previous Games"
        showShadow
        leftActionBtn={{
          label: 'back button',
          icon: ArrowLeftIcon,
          type: 'link',
          link: AppRoutes.start,
        }}
      />
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
            Select the game for more options!
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
                  onDeleteGame={onDeleteGame}
                  onViewGame={handleViewGame}
                  isSelected={selectedGame?.id === game.id}
                  key={game.id}
                  game={game}
                />
              ))}
          </div>
        </div>
      )}
      <Portal>
        <Animations.SlideUp show={showScoreSheet}>
          <ScoreSheetPage onClose={handleCloseScoreSheet} />
        </Animations.SlideUp>
      </Portal>
      <ConfirmationModal
        title="Delete game?"
        isOpen={showDeleteConfirmation}
        onClose={() => setShowDeleteConfirmation(false)}
        onConfirm={confirmDeleteGame}
        cancelBtnText="No"
        confirmBtnText="Yes, delete"
        confirmBtnClassName="bg-red-500 text-white hover:bg-red-600"
      >
        Are you sure you want to delete this game?
      </ConfirmationModal>
    </div>
  );
};

export default PreviousGamesPage;

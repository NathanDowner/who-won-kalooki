import { Animations } from '@/components/animations';
import PlayerScoreCard from '@/components/PlayerScoreCard';
import Portal from '@/components/Portal';
import { useAuth } from '@/contexts/AuthContext';
import { GameType } from '@/models/gameType.enum';
import { AppRoutes } from '@/routes';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectPlayers } from '@/store/playersSlice';
import {
  selectRounds,
  selectTotalsUpToRound,
  setInitialScores,
} from '@/store/scoreSlice';
import { storage } from '@/utils/storage';
import { FirebaseError } from 'firebase/app';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import ScoreSheetPage from '../../../pages/ScoreSheetPage';
import AppHeader from '@/components/AppHeader';
import {
  ClipboardDocumentListIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';
import { Timestamp } from 'firebase/firestore';
import { useSaveGame } from '../api/saveGame';
import { useUpdateGame } from '../api/updateGame';
import { hasUserName } from '../utils';
import { FINAL_ROUND, FIRST_ROUND } from '@/utils/constants';

const FinalScorePage = () => {
  const [gameId] = useState(storage.getGameId());
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { execute: saveGame } = useSaveGame();
  const { execute: updateGame } = useUpdateGame();

  const [showScoreSheet, setShowScoreSheet] = useState(false);
  const players = useAppSelector(selectPlayers);
  const rounds = useAppSelector(selectRounds);
  const totalsSoFar = useAppSelector(selectTotalsUpToRound(FINAL_ROUND, true));

  const lowestScore = Math.min(...totalsSoFar);

  function saveToFirebase() {
    const winningIndex = totalsSoFar.indexOf(lowestScore);
    const winner = players[winningIndex];
    const isComplete = Math.max(...rounds[FINAL_ROUND]) != 0;
    const endedAt = Timestamp.now();
    const creator = players.find((player) => player.id === user?.uid)!;
    const playerUserNames = players.filter(hasUserName).map((p) => p.userName!);

    if (user) {
      if (gameId) {
        try {
          toast.promise(
            updateGame({
              id: gameId,
              scores: rounds,
              winner: { ...winner },
              players,
              isComplete,
              endedAt,
              playerUserNames,
            }),
            {
              loading: 'Saving game...',
              success: 'Game saved!',
              error: 'Failed to save game',
            },
          );
        } catch (error) {
          console.log(error);
          toast.error((error as FirebaseError).message);
        }
      } else {
        try {
          toast.promise(
            saveGame({
              type: GameType.Kalooki,
              players,
              creator,
              scores: rounds,
              winner: winner,
              endedAt,
              isComplete,
              playerUserNames,
            }),
            {
              loading: 'Saving game...',
              success: 'Game saved!',
              error: 'Failed to save game',
            },
          );
        } catch (error) {
          console.log(error);
          toast.error((error as FirebaseError).message);
        }
      }
    }
  }

  function onPlayAgain() {
    dispatch(setInitialScores(players.length));
    navigate(AppRoutes.round(FIRST_ROUND));
  }

  function onStartOver() {
    navigate(AppRoutes.start);
  }

  useEffect(() => {
    if (!players.length) {
      navigate(AppRoutes.start);
    }

    saveToFirebase();
    storage.clearData(); // TODO: clear on start page
  }, []);

  return (
    <div className="page">
      <AppHeader
        title="Final Score"
        showShadow
        leftActionBtn={{
          label: 'home button',
          icon: HomeIcon,
          type: 'link',
          link: AppRoutes.start,
        }}
        rightActionBtn={{
          label: 'sheet button',
          icon: ClipboardDocumentListIcon,
          type: 'button',
          onClick: () => setShowScoreSheet(true),
        }}
      />

      <div className="space-y-4">
        {players
          .map((player, idx) => ({ ...player, score: totalsSoFar[idx] }))
          .sort((a, b) => a.score - b.score)
          .map((player, idx) => (
            <PlayerScoreCard
              key={idx}
              playerName={player.name}
              imgUrl={player.imgUrl}
              score={player.score}
              order={idx + 1}
              winner={player.score === lowestScore}
            />
          ))}
      </div>
      <Portal>
        <Animations.SlideUp show={showScoreSheet}>
          <ScoreSheetPage onClose={() => setShowScoreSheet(false)} />
        </Animations.SlideUp>
      </Portal>
      <footer className="button-container">
        <button className="btn btn-lg flex-1" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="btn btn-lg flex-1" onClick={onStartOver}>
          Go Home
        </button>
      </footer>
    </div>
  );
};

export default FinalScorePage;

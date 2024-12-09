import { Animations } from '@/components/animations';
import PlayerScoreCard from '@/components/PlayerScoreCard';
import Portal from '@/components/Portal';
import { useAuth } from '@/contexts/AuthContext';
import { saveGame, updateGame } from '@/lib/firebase';
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
import { Player } from '@/models/player.interface';
import { Timestamp } from 'firebase/firestore';

function hasUserName(player: Player): boolean {
  return player.userName !== undefined;
}

const FinalScorePage = () => {
  const [gameId] = useState(storage.getGameId());
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [showScoreSheet, setShowScoreSheet] = useState(false);
  const players = useAppSelector(selectPlayers);
  const rounds = useAppSelector(selectRounds);
  const totalsSoFar = useAppSelector(selectTotalsUpToRound('4444', true));

  const lowestScore = Math.min(...totalsSoFar);

  function saveToFirebase() {
    const winningIndex = totalsSoFar.indexOf(lowestScore);
    const winner = players[winningIndex];

    if (user) {
      if (gameId) {
        console.log('Time: ', Timestamp.now().toDate().toLocaleTimeString());
        try {
          toast.promise(
            updateGame({
              id: gameId,
              scores: rounds,
              winner: { ...winner },
              isComplete: Math.max(...rounds['4444']) != 0,
              endedAt: Timestamp.now(),
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
              creator: players.find((player) => player.id === user.uid)!,
              scores: rounds,
              winner: winner,
              endedAt: Timestamp.now(),
              isComplete: Math.max(...rounds['4444']) != 0,
              playerUserNames: players
                .filter(hasUserName)
                .map((p) => p.userName!),
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
    navigate(AppRoutes.round('333'));
  }

  function onStartOver() {
    navigate(AppRoutes.start);
  }

  useEffect(() => {
    if (!players.length) {
      navigate(AppRoutes.start);
    }

    saveToFirebase();
    storage.clearData();
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

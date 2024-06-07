import ButtonContainer from '@/components/ButtonContainer';
import PlayerCard from '@/components/PlayerCard';
import { useAuth } from '@/contexts/AuthContext';
import useSetPageTitle from '@/hooks/useSetPageTitle';
import { saveGame, updateGame } from '@/lib/firebase';
import { GameType } from '@/models/gameType.enum';
import { useAppSelector } from '@/store/hooks';
import { selectPlayers } from '@/store/playersSlice';
import { selectRounds, selectTotalsUpToRound } from '@/store/scoreSlice';
import { storage } from '@/utils/storage';
import { FirebaseError } from 'firebase/app';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Props {
  onPlayAgain: () => void;
  onStartOver: () => void;
  onShowScoreSheet: () => void;
}

const FinalScorePage = ({
  onPlayAgain,
  onStartOver,
  onShowScoreSheet,
}: Props) => {
  const [gameId] = useState(storage.getGameId());
  const { user } = useAuth();
  const players = useAppSelector(selectPlayers);
  const rounds = useAppSelector(selectRounds);
  const totalsSoFar = useAppSelector(selectTotalsUpToRound('4444', true));
  useSetPageTitle('Final Scores');

  const lowestScore = Math.min(...totalsSoFar);

  function saveToFirebase() {
    const winningIndex = totalsSoFar.indexOf(lowestScore);
    const winner = players[winningIndex];

    if (user) {
      if (gameId) {
        try {
          toast.promise(
            updateGame({
              id: gameId,
              scores: rounds,
              winner: winner,
              isComplete: Math.max(...rounds['4444']) != 0,
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
              isComplete: Math.max(...rounds['4444']) != 0,
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

  useEffect(() => {
    saveToFirebase();
    storage.clearData();
  }, []);

  return (
    <div className="page">
      <button onClick={onShowScoreSheet} className="btn btn-sm mb-4">
        View score sheet
      </button>
      <div className="space-y-4">
        {players
          .map((player, idx) => ({ ...player, score: totalsSoFar[idx] }))
          .sort((a, b) => a.score - b.score)
          .map((player, idx) => (
            <PlayerCard
              key={idx}
              player={player}
              score={player.score}
              order={idx + 1}
              winner={player.score === lowestScore}
            />
          ))}
      </div>
      <ButtonContainer>
        <button className="btn btn-lg flex-1" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="btn btn-lg flex-1" onClick={onStartOver}>
          Start Over
        </button>
      </ButtonContainer>
    </div>
  );
};

export default FinalScorePage;

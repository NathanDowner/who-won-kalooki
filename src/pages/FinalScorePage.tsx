import ButtonContainer from '@/components/ButtonContainer';
import PlayerCard from '@/components/PlayerCard';
import { useAuth } from '@/contexts/AuthContext';
import useSetPageTitle from '@/hooks/useSetPageTitle';
import { saveGame } from '@/lib/firebase';
import { GameType } from '@/models/gameType.enum';
import { useAppSelector } from '@/store/hooks';
import { selectPlayers } from '@/store/playersSlice';
import { selectRounds, selectTotalsUpToRound } from '@/store/scoreSlice';
import { storage } from '@/utils/storage';
import { useEffect } from 'react';

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
  const { user } = useAuth();
  const players = useAppSelector(selectPlayers);
  const rounds = useAppSelector(selectRounds);
  const totalsSoFar = useAppSelector(selectTotalsUpToRound('4444', true));
  useSetPageTitle('Final Scores');

  const lowestScore = Math.min(...totalsSoFar);

  useEffect(() => {
    const winningIndex = totalsSoFar.indexOf(lowestScore);
    const winner = players[winningIndex];
    if (user) {
      saveGame({
        type: GameType.Kalooki,
        players,
        creator: players.find((player) => player.id === user.uid)!,
        scores: rounds,
        winner: winner,
        isComplete: Math.max(...rounds['4444']) != 0,
      });
    }
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

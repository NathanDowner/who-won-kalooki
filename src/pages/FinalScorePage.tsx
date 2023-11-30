import ButtonContainer from '@/components/ButtonContainer';
import PlayerCard from '@/components/PlayerCard';
import useSetPageTitle from '@/hooks/useSetPageTitle';
import { useAppSelector } from '@/store/hooks';
import { selectPlayers } from '@/store/playersSlice';
import { selectTotalsUpToRound } from '@/store/scoreSlice';

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
  const players = useAppSelector(selectPlayers);
  const totalsSoFar = useAppSelector(selectTotalsUpToRound('4444', true));
  useSetPageTitle('Final Score');

  const lowestScore = Math.min(...totalsSoFar);

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

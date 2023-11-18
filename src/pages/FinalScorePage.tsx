import ButtonContainer from '@/components/ButtonContainer';
import PlayerCard from '@/components/PlayerCard';
import { useAppSelector } from '@/store/hooks';
import { selectPlayers } from '@/store/playersSlice';
import { selectTotalsUpToRound } from '@/store/scoreSlice';

interface Props {
  onPlayAgain: () => void;
  onStartOver: () => void;
}

const FinalScorePage = ({ onPlayAgain, onStartOver }: Props) => {
  const players = useAppSelector(selectPlayers);
  const totalsSoFar = useAppSelector(selectTotalsUpToRound('4444', true));

  const lowestScore = Math.min(...totalsSoFar);

  return (
    <div className="page">
      <div className="space-y-4 mx-2">
        {players.map((player, idx) => (
          <PlayerCard
            key={idx}
            player={player}
            score={totalsSoFar[idx]}
            winner={totalsSoFar[idx] === lowestScore}
          />
        ))}
      </div>
      <ButtonContainer>
        <button className="btn btn-lg btn-outline flex-1" onClick={onPlayAgain}>
          Play Again
        </button>
        <button className="btn btn-lg btn-outline flex-1" onClick={onStartOver}>
          Start Over
        </button>
      </ButtonContainer>
    </div>
  );
};

export default FinalScorePage;
